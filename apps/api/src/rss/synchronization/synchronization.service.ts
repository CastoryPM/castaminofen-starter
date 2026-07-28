import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { MatchingService } from '../matching/matching.service';
import { NormalizerService } from '../normalizer/normalizer.service';
import { ParserService } from '../parser/parser.service';
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
    private readonly fetcher?: FetcherService,
    private readonly parser?: ParserService,
    private readonly normalizer?: NormalizerService,
  ) {}

  async synchronize(input: string | NormalizedFeed): Promise<SynchronizationResult> {
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

    const feedSourceUrl = typeof input === 'string' ? input : input.podcast.rssUrl ?? '';
    const feedSourceKey = feedSourceUrl || 'unknown feed';
    const startedAt = Date.now();

    this.logger.log(`Synchronization started for ${feedSourceUrl || 'unknown feed'}`);

    if (this.runningFeedSources.has(feedSourceKey)) {
      this.logger.warn(`Concurrent synchronization prevented for ${feedSourceUrl || 'unknown feed'}`);
      return result;
    }

    this.runningFeedSources.add(feedSourceKey);

    try {
      await this.markFeedSourceRunning(feedSourceUrl);

      const feed = typeof input === 'string' ? await this.orchestrateFeed(input) : input;
      const rssUrl = feed.podcast.rssUrl ?? feedSourceUrl;

      const existingPodcast = await this.persistence.findPodcastByRssUrl(this.prisma, rssUrl);
      const existingEpisodes = existingPodcast ? await this.persistence.findEpisodesByPodcastId(this.prisma, existingPodcast.id) : [];

      const podcastChanged = existingPodcast ? this.hasPodcastChanges(existingPodcast, feed.podcast) : true;
      const podcastAction = existingPodcast ? (podcastChanged ? 'update' : 'none') : 'insert';

      const episodesToPersist: Array<{
        kind: 'insert' | 'update';
        episode: NormalizedEpisodeInput;
        existingEpisode?: { id: string };
      }> = [];

      if (podcastAction !== 'none') {
        result.noOp = false;
      }

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
          episodesToPersist.push({ kind: 'insert', episode });
          result.episodeInserted += 1;
          result.noOp = false;
          this.logger.log(`Episode queued for insert: ${episode.title}`);
          continue;
        }

        const episodeChanged = this.hasEpisodeChanges(existingEpisode, episode);
        if (episodeChanged) {
          episodesToPersist.push({ kind: 'update', episode, existingEpisode: { id: existingEpisode.id } });
          result.episodeUpdated += 1;
          result.noOp = false;
          this.logger.log(`Episode queued for update: ${existingEpisode.id}`);
        } else {
          this.logger.log(`Episode ignored: unchanged ${existingEpisode.id}`);
        }
      }

      const feedSource = await this.prisma.$transaction(async (tx) => {
        const persistedFeedSource = await this.persistence.ensureFeedSource(tx, rssUrl);

        let podcast = existingPodcast;
        if (!existingPodcast) {
          podcast = await this.persistence.createPodcast(tx, feed.podcast, persistedFeedSource.id);
          result.podcast = podcast;
          result.podcastInserted += 1;
          this.logger.log(`Podcast inserted: ${podcast.id}`);
        } else if (podcastChanged) {
          podcast = await this.persistence.updatePodcast(tx, existingPodcast.id, this.buildPodcastUpdatePayload(feed.podcast));
          result.podcast = podcast;
          result.podcastUpdated += 1;
          this.logger.log(`Podcast updated: ${existingPodcast.id}`);
        } else {
          result.podcast = existingPodcast;
        }

        if (!podcast) {
          throw new Error('Podcast synchronization failed to resolve a podcast entity');
        }

        await this.updateFeedSourceOperationalState(tx, persistedFeedSource.id, {
          syncStatus: 'RUNNING',
          lastError: null,
        });

        return persistedFeedSource;
      });

      if (!feedSource) {
        throw new Error('FeedSource persistence failed unexpectedly');
      }

      result.episodes = await this.persistEpisodesInBatches(feedSource.id, result.podcast?.id ?? '', episodesToPersist);

      await this.prisma.$transaction(async (tx) => {
        await this.updateFeedSourceOperationalState(tx, feedSource.id, {
          syncStatus: 'SUCCESS',
          lastSyncedAt: new Date(),
          lastError: null,
        });
      });

      const finishedAt = Date.now();
      this.logger.log(
        `Synchronization completed for ${feedSourceUrl || 'unknown feed'}; ` +
          `duration=${finishedAt - startedAt}ms; ` +
          `podcastProcessed=${result.podcastInserted + result.podcastUpdated}; ` +
          `episodesProcessed=${result.episodeInserted + result.episodeUpdated}; ` +
          `episodesIgnored=${result.episodeIgnored}`,
      );

      return result;
    } catch (error) {
      result.failed = true;
      result.noOp = false;
      const message = error instanceof Error ? error.message : String(error);
      try {
        await this.prisma.$transaction(async (tx) => {
          const feedSource = await this.persistence.ensureFeedSource(tx, feedSourceUrl);
          await this.updateFeedSourceOperationalState(tx, feedSource.id, {
            syncStatus: 'FAILED',
            lastError: message,
          });
        });
      } catch (stateError) {
        this.logger.error(`FeedSource status update failed: ${stateError instanceof Error ? stateError.message : String(stateError)}`);
      }
      this.logger.error(`Synchronization failed for ${feedSourceUrl || 'unknown feed'}: ${message}`);
      return result;
    } finally {
      this.runningFeedSources.delete(feedSourceKey);
    }
  }

  private async markFeedSourceRunning(feedSourceUrl: string) {
    if (!feedSourceUrl) {
      return;
    }

    await this.prisma.$transaction(async (tx) => {
      const feedSource = await this.persistence.ensureFeedSource(tx, feedSourceUrl);
      await this.updateFeedSourceOperationalState(tx, feedSource.id, { syncStatus: 'RUNNING', lastError: null });
    });
  }

  private async orchestrateFeed(feedUrl: string): Promise<NormalizedFeed> {
    if (!this.fetcher || !this.parser || !this.normalizer) {
      throw new Error('RSS orchestration services are not configured');
    }

    const rawFeed = await this.fetcher.fetchFeed(feedUrl);
    const parsedFeed = this.parser.parse(rawFeed);
    return this.normalizer.normalize(parsedFeed, feedUrl);
  }

  private async persistEpisodesInBatches(
    feedSourceId: string,
    podcastId: string,
    actions: Array<{ kind: 'insert' | 'update'; episode: NormalizedEpisodeInput; existingEpisode?: { id: string } }>,
  ): Promise<Array<{ id: string; title: string }>> {
    const batchSize = Number(process.env.RSS_EPISODE_BATCH_SIZE ?? '50');
    const persistedEpisodes: Array<{ id: string; title: string }> = [];

    for (let start = 0; start < actions.length; start += batchSize) {
      const batch = actions.slice(start, start + batchSize);
      const createdOrUpdated = await this.prisma.$transaction(async (tx) => {
        const batchResults: Array<{ id: string; title: string }> = [];
        for (const action of batch) {
          if (action.kind === 'insert') {
            const createdEpisode = await this.persistence.createEpisode(tx, podcastId, action.episode);
            batchResults.push(createdEpisode);
            this.logger.log(`Episode inserted: ${action.episode.title}`);
            continue;
          }

          if (action.kind === 'update' && action.existingEpisode) {
            const updatedEpisode = await this.persistence.updateEpisode(tx, action.existingEpisode.id, this.buildEpisodeUpdatePayload(action.episode));
            batchResults.push(updatedEpisode);
            this.logger.log(`Episode updated: ${action.existingEpisode.id}`);
          }
        }
        return batchResults;
      });

      persistedEpisodes.push(...createdOrUpdated);
    }

    return persistedEpisodes;
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
