import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MatchingService } from '../matching/matching.service';
import { NormalizedFeed, NormalizedEpisodeInput, NormalizedPodcastInput } from '../types';

export interface SynchronizationResult {
  podcastInserted: number;
  podcastUpdated: number;
  episodeInserted: number;
  episodeUpdated: number;
  episodeIgnored: number;
  noOp: boolean;
  failed: boolean;
  podcast: { id: string; title: string; rssUrl: string } | null;
  episodes: Array<{ id: string; title: string }>;
}

interface SynchronizationPersistence {
  ensureFeedSource(tx: unknown, url: string): Promise<{ id: string; url: string }>;
  updateFeedSourceState(tx: unknown, feedSourceId: string, data: { syncStatus?: string; lastSyncedAt?: Date | null; lastError?: string | null }): Promise<{ id: string; url: string; syncStatus?: string; lastSyncedAt?: Date | null; lastError?: string | null }>;
  findPodcastByRssUrl(tx: unknown, rssUrl: string): Promise<null | { id: string; title: string; description: string | null; website: string | null; artworkUrl: string | null; rssUrl: string }>;
  findEpisodesByPodcastId(tx: unknown, podcastId: string): Promise<Array<{ id: string; title: string; description: string | null; guid: string | null; audioUrl: string | null; duration: number | null; publishedAt: Date | null }>>;
  createPodcast(tx: unknown, feed: NormalizedPodcastInput, feedSourceId: string): Promise<{ id: string; title: string; description: string | null; website: string | null; artworkUrl: string | null; rssUrl: string }>;
  updatePodcast(tx: unknown, podcastId: string, data: Partial<NormalizedPodcastInput>): Promise<{ id: string; title: string; description: string | null; website: string | null; artworkUrl: string | null; rssUrl: string }>;
  createEpisode(tx: unknown, podcastId: string, episode: NormalizedEpisodeInput): Promise<{ id: string; title: string }>;
  updateEpisode(tx: unknown, episodeId: string, data: Partial<NormalizedEpisodeInput>): Promise<{ id: string; title: string }>;
}

@Injectable()
export class SynchronizationService {
  private readonly logger = new Logger(SynchronizationService.name);
  private readonly runningFeedSources = new Set<string>();

  constructor(
    private readonly matchingService: MatchingService,
    private readonly persistence: SynchronizationPersistence,
    private readonly prisma: PrismaService,
  ) {}

  async synchronize(feed: NormalizedFeed): Promise<SynchronizationResult> {
    const rssUrl = feed.podcast.rssUrl ?? '';
    const result: SynchronizationResult = {
      podcastInserted: 0,
      podcastUpdated: 0,
      episodeInserted: 0,
      episodeUpdated: 0,
      episodeIgnored: 0,
      noOp: true,
      failed: false,
      podcast: null,
      episodes: [],
    };

    this.logger.log(`Synchronization started for ${rssUrl || 'unknown feed'}`);

    if (this.runningFeedSources.has(rssUrl)) {
      this.logger.warn(`Concurrent synchronization prevented for ${rssUrl || 'unknown feed'}`);
      return result;
    }

    const feedSourceKey = rssUrl || 'unknown feed';
    this.runningFeedSources.add(feedSourceKey);

    try {
      await this.prisma.$transaction(async (tx) => {
        const feedSource = await this.persistence.ensureFeedSource(tx, rssUrl);
        await this.updateFeedSourceOperationalState(tx, feedSource.id, { syncStatus: 'RUNNING', lastError: null });

        const existingPodcast = await this.persistence.findPodcastByRssUrl(tx, rssUrl);

        let podcast = existingPodcast;
        if (!existingPodcast) {
          const createdPodcast = await this.persistence.createPodcast(tx, feed.podcast, feedSource.id);
          podcast = createdPodcast;
          result.podcast = podcast;
          result.podcastInserted += 1;
          result.noOp = false;
          this.logger.log(`Podcast inserted: ${podcast.id}`);
        } else {
          const podcastChanged = this.hasPodcastChanges(existingPodcast, feed.podcast);
          if (podcastChanged) {
            podcast = await this.persistence.updatePodcast(tx, existingPodcast.id, this.buildPodcastUpdatePayload(feed.podcast));
            result.podcast = podcast;
            result.podcastUpdated += 1;
            result.noOp = false;
            this.logger.log(`Podcast updated: ${existingPodcast.id}`);
          } else {
            result.podcast = existingPodcast;
          }
        }

        if (!podcast) {
          throw new Error('Podcast synchronization failed to resolve a podcast entity');
        }

        const existingEpisodes = await this.persistence.findEpisodesByPodcastId(tx, podcast.id);
        for (const episode of feed.episodes) {
          if (!this.hasMeaningfulValue(episode.title)) {
            result.episodeIgnored += 1;
            this.logger.log('Episode ignored: missing title');
            continue;
          }

          const matchingResult = this.matchingService.matchEpisode(
            episode,
            existingEpisodes.map((existing) => ({
              guid: existing.guid,
              audioUrl: existing.audioUrl,
              title: existing.title,
              publishedAt: existing.publishedAt,
            })),
          );

          if (matchingResult.kind === 'Ignored') {
            result.episodeIgnored += 1;
            this.logger.log('Episode ignored: insufficient identity');
            continue;
          }

          const existingEpisode = this.findMatchingEpisode(existingEpisodes, episode);

          if (!existingEpisode) {
            const createdEpisode = await this.persistence.createEpisode(tx, podcast.id, episode);
            result.episodes.push(createdEpisode);
            result.episodeInserted += 1;
            result.noOp = false;
            this.logger.log(`Episode inserted: ${episode.title}`);
            continue;
          }

          const episodeChanged = this.hasEpisodeChanges(existingEpisode, episode);
          if (episodeChanged) {
            const updatedEpisode = await this.persistence.updateEpisode(tx, existingEpisode.id, this.buildEpisodeUpdatePayload(episode));
            result.episodes.push(updatedEpisode);
            result.episodeUpdated += 1;
            result.noOp = false;
            this.logger.log(`Episode updated: ${existingEpisode.id}`);
          } else {
            this.logger.log(`Episode ignored: unchanged ${existingEpisode.id}`);
          }
        }

        await this.updateFeedSourceOperationalState(tx, feedSource.id, {
          syncStatus: 'SUCCESS',
          lastSyncedAt: new Date(),
          lastError: null,
        });
      });

      this.logger.log(`Synchronization completed for ${rssUrl || 'unknown feed'}`);
      return result;
    } catch (error) {
      result.failed = true;
      result.noOp = false;
      const message = error instanceof Error ? error.message : String(error);
      try {
        await this.prisma.$transaction(async (tx) => {
          const feedSource = await this.persistence.ensureFeedSource(tx, rssUrl);
          await this.updateFeedSourceOperationalState(tx, feedSource.id, {
            syncStatus: 'FAILED',
            lastError: message,
          });
        });
      } catch (stateError) {
        this.logger.error(`FeedSource status update failed: ${stateError instanceof Error ? stateError.message : String(stateError)}`);
      }
      this.logger.error(`Synchronization failed: ${message}`);
      return result;
    } finally {
      this.runningFeedSources.delete(feedSourceKey);
    }
  }

  private async updateFeedSourceOperationalState(tx: unknown, feedSourceId: string, data: { syncStatus?: string; lastSyncedAt?: Date | null; lastError?: string | null }) {
    await this.persistence.updateFeedSourceState(tx, feedSourceId, data);
    this.logger.log(`FeedSource status updated: ${data.syncStatus ?? 'unchanged'}`);
  }

  private findMatchingEpisode(existingEpisodes: Array<{ id: string; title: string; description: string | null; guid: string | null; audioUrl: string | null; duration: number | null; publishedAt: Date | null }>, episode: NormalizedEpisodeInput) {
    return existingEpisodes.find((candidate) => {
      if (this.hasMeaningfulValue(episode.guid)) {
        return this.normalizeValue(candidate.guid) === this.normalizeValue(episode.guid);
      }

      if (this.hasMeaningfulValue(episode.audioUrl)) {
        return this.normalizeValue(candidate.audioUrl) === this.normalizeValue(episode.audioUrl);
      }

      return this.hasMeaningfulValue(candidate.title) && this.hasMeaningfulValue(candidate.publishedAt) && this.normalizeValue(candidate.title) === this.normalizeValue(episode.title) && this.sameDate(candidate.publishedAt, episode.publishedAt);
    });
  }

  private hasPodcastChanges(existing: { title: string; description: string | null; website: string | null; artworkUrl: string | null }, incoming: Partial<NormalizedPodcastInput>): boolean {
    return (
      existing.title !== incoming.title ||
      (existing.description ?? null) !== (incoming.description ?? null) ||
      (existing.website ?? null) !== (incoming.website ?? null) ||
      (existing.artworkUrl ?? null) !== (incoming.artworkUrl ?? null)
    );
  }

  private buildPodcastUpdatePayload(incoming: Partial<NormalizedPodcastInput>): Partial<NormalizedPodcastInput> {
    return {
      title: incoming.title,
      description: incoming.description ?? null,
      website: incoming.website ?? null,
      artworkUrl: incoming.artworkUrl ?? null,
    };
  }

  private hasEpisodeChanges(existing: { title: string; description: string | null; guid: string | null; audioUrl: string | null; duration: number | null; publishedAt: Date | null }, incoming: Partial<NormalizedEpisodeInput>): boolean {
    return (
      existing.title !== incoming.title ||
      (existing.description ?? null) !== (incoming.description ?? null) ||
      (existing.guid ?? null) !== (incoming.guid ?? null) ||
      (existing.audioUrl ?? null) !== (incoming.audioUrl ?? null) ||
      (existing.duration ?? null) !== (incoming.duration ?? null) ||
      (existing.publishedAt?.getTime() ?? null) !== (incoming.publishedAt?.getTime() ?? null)
    );
  }

  private buildEpisodeUpdatePayload(incoming: Partial<NormalizedEpisodeInput>): Partial<NormalizedEpisodeInput> {
    return {
      title: incoming.title,
      description: incoming.description ?? null,
      guid: incoming.guid ?? null,
      audioUrl: incoming.audioUrl ?? null,
      duration: incoming.duration ?? null,
      publishedAt: incoming.publishedAt ?? null,
    };
  }

  private hasMeaningfulValue(value: string | Date | null | undefined): value is string | Date {
    if (value === null || value === undefined) {
      return false;
    }

    if (value instanceof Date) {
      return !Number.isNaN(value.getTime());
    }

    return value.trim().length > 0;
  }

  private normalizeValue(value: string | null | undefined): string {
    return value?.trim().toLowerCase() ?? '';
  }

  private sameDate(a: Date | null | undefined, b: Date | null | undefined): boolean {
    if (!this.hasMeaningfulValue(a) || !this.hasMeaningfulValue(b)) {
      return false;
    }

    return a.getTime() === b.getTime();
  }
}
