import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MatchingService } from '../matching/matching.service';
import { SynchronizationService } from '../synchronization/synchronization.service';
import { NormalizedFeed, NormalizedEpisodeInput, NormalizedPodcastInput } from '../types';

@Injectable()
export class RssPersistenceService {
  constructor(private readonly prisma: PrismaService) {}

  async persistNormalizedFeed(feed: NormalizedFeed) {
    this.assertValidFeed(feed);

    const synchronizationService = new SynchronizationService(
      new MatchingService(),
      {
        ensureFeedSource: async (tx: any, url: string) =>
          tx.feedSource.upsert({
            where: { url },
            update: {},
            create: {
              url,
              type: 'RSS',
            },
          }),
        updateFeedSourceState: async (tx: any, feedSourceId: string, data: { syncStatus?: string; lastSyncedAt?: Date | null; lastError?: string | null }) => {
          const updateData: Record<string, unknown> = {};
          if (data.syncStatus !== undefined) {
            updateData.syncStatus = data.syncStatus;
          }
          if (data.lastSyncedAt !== undefined) {
            updateData.lastSyncedAt = data.lastSyncedAt;
          }
          if (data.lastError !== undefined) {
            updateData.lastError = data.lastError;
          }

          return tx.feedSource.update({
            where: { id: feedSourceId },
            data: updateData,
          });
        },
        findPodcastByRssUrl: async (tx: any, rssUrl: string) =>
          tx.podcast.findFirst({
            where: { rssUrl },
          }),
        findEpisodesByPodcastId: async (tx: any, podcastId: string) =>
          tx.episode.findMany({
            where: { podcastId },
          }),
        createPodcast: async (tx: any, feedData: NormalizedPodcastInput, feedSourceId: string) =>
          tx.podcast.create({
            data: {
              title: feedData.title,
              rssUrl: feedData.rssUrl ?? '',
              description: feedData.description ?? null,
              website: feedData.website ?? null,
              artworkUrl: feedData.artworkUrl ?? null,
              feedSourceId,
            },
          }),
        updatePodcast: async (tx: any, podcastId: string, data: Partial<NormalizedPodcastInput>) =>
          tx.podcast.update({
            where: { id: podcastId },
            data: {
              title: data.title,
              description: data.description ?? null,
              website: data.website ?? null,
              artworkUrl: data.artworkUrl ?? null,
            },
          }),
        createEpisode: async (tx: any, podcastId: string, episode: NormalizedEpisodeInput) =>
          tx.episode.create({
            data: {
              podcastId,
              title: episode.title,
              description: episode.description ?? null,
              guid: episode.guid ?? null,
              audioUrl: episode.audioUrl ?? null,
              duration: episode.duration ?? null,
              publishedAt: episode.publishedAt ?? null,
            },
          }),
        updateEpisode: async (tx: any, episodeId: string, data: Partial<NormalizedEpisodeInput>) =>
          tx.episode.update({
            where: { id: episodeId },
            data: {
              title: data.title,
              description: data.description ?? null,
              guid: data.guid ?? null,
              audioUrl: data.audioUrl ?? null,
              duration: data.duration ?? null,
              publishedAt: data.publishedAt ?? null,
            },
          }),
      },
      this.prisma,
    );

    return synchronizationService.synchronize(feed);
  }

  private assertValidFeed(feed: NormalizedFeed) {
    if (!feed?.podcast?.title || !feed?.podcast?.rssUrl) {
      throw new BadRequestException('RSS persistence requires a podcast title and RSS URL');
    }
  }
}
