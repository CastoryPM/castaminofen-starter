import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import * as bcrypt from 'bcrypt';
import { FetcherService } from './fetcher/fetcher.service';
import { ParserService } from './parser/parser.service';
import { NormalizerService } from './normalizer/normalizer.service';
import { ImporterService } from './importer/importer.service';
import { MatchingService } from './matching/matching.service';
import { RssPersistenceService } from './persistence/rss-persistence.service';
import { SynchronizationService, SYNCHRONIZATION_PERSISTENCE } from './synchronization/synchronization.service';
import { RssSyncOrchestrator } from './orchestration/rss-sync.orchestrator';
import { RssSyncController } from './controllers/rss-sync.controller';
import { FeedSourceController } from './controllers/feed-source.controller';
import { FeedSourceService } from './services/feed-source.service';
import { FeedSourceSeederService } from './bootstrap/feed-seeder.service';
import { NormalizedEpisodeInput, NormalizedPodcastInput } from './types';

@Module({
  imports: [PrismaModule],
  controllers: [RssSyncController, FeedSourceController],
  providers: [
    FetcherService,
    ParserService,
    NormalizerService,
    ImporterService,
    MatchingService,
    RssPersistenceService,
    {
      provide: SYNCHRONIZATION_PERSISTENCE,
      useFactory: () => ({
        ensureFeedSource: async (tx: any, url: string) =>
          tx.feedSource.upsert({
            where: { url },
            update: {},
            create: { url, type: 'RSS' },
          }),
        updateFeedSourceState: async (
          tx: any,
          feedSourceId: string,
          data: { syncStatus?: string; lastSyncedAt?: Date | null; lastError?: string | null },
        ) => {
          const updateData: Record<string, unknown> = {};
          if (data.syncStatus !== undefined) updateData.syncStatus = data.syncStatus;
          if (data.lastSyncedAt !== undefined) updateData.lastSyncedAt = data.lastSyncedAt;
          if (data.lastError !== undefined) updateData.lastError = data.lastError;

          return tx.feedSource.update({
            where: { id: feedSourceId },
            data: updateData,
          });
        },
        findPodcastByRssUrl: async (tx: any, rssUrl: string) =>
          tx.podcast.findFirst({ where: { rssUrl } }),
        findEpisodesByPodcastId: async (tx: any, podcastId: string) =>
          tx.episode.findMany({ where: { podcastId } }),
        createPodcast: async (tx: any, feedData: NormalizedPodcastInput, feedSourceId: string) => {
          const title = feedData.title?.trim() || 'Imported Podcast';
          const slug =
            title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '') || 'imported-podcast';
          const email = `podcast-${slug}@castaminofen.local`;
          const password = await bcrypt.hash(`castaminofen-${slug}`, 10);
          const owner = await tx.user.upsert({
            where: { email },
            update: { name: title },
            create: {
              email,
              name: title,
              password,
            },
          });

          return tx.podcast.create({
            data: {
              title: feedData.title,
              rssUrl: feedData.rssUrl ?? '',
              description: feedData.description ?? null,
              website: feedData.website ?? null,
              artworkUrl: feedData.artworkUrl ?? null,
              feedSourceId,
              ownerId: owner.id,
            },
          });
        },
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
      }),
    },
    SynchronizationService,
    RssSyncOrchestrator,
    FeedSourceService,
    FeedSourceSeederService,
  ],
  exports: [ImporterService],
})
export class RssModule {}
