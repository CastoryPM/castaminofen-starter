import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SynchronizationService } from '../synchronization/synchronization.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { ParserService } from '../parser/parser.service';
import { NormalizerService } from '../normalizer/normalizer.service';

export interface SyncResultDto {
  status: 'SUCCESS' | 'FAILED' | 'CONFLICT';
  feedSourceId?: string;
  startedAt: Date;
  finishedAt: Date;
  processedPodcasts: number;
  processedEpisodes: number;
  errorMessage?: string;
}

export interface BatchSyncResultDto {
  processedFeeds: number;
  successful: number;
  failed: number;
  results: Array<{
    feedSourceId: string;
    url: string;
    status: 'SUCCESS' | 'FAILED';
    errorMessage?: string;
  }>;
}

export interface FeedSourceStatusDto {
  id: string;
  url: string;
  syncStatus: string;
  lastSyncedAt: Date | null;
  lastError: string | null;
}

@Injectable()
export class RssSyncOrchestrator {
  private readonly logger = new Logger(RssSyncOrchestrator.name);
  private readonly runningSyncs = new Set<string>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly synchronizationService: SynchronizationService,
    private readonly fetcherService: FetcherService,
    private readonly parserService: ParserService,
    private readonly normalizerService: NormalizerService,
  ) {}

  async syncFeedSource(feedSourceId: string): Promise<SyncResultDto> {
    const startedAt = new Date();

    // Validate FeedSource exists
    const feedSource = await this.prisma.feedSource.findUnique({
      where: { id: feedSourceId },
    });

    if (!feedSource) {
      throw new NotFoundException(`FeedSource with ID ${feedSourceId} not found`);
    }

    const feedUrl = feedSource.url;

    // Check if already running
    if (this.runningSyncs.has(feedSourceId)) {
      throw new ConflictException(`Synchronization already running for FeedSource ${feedSourceId}`);
    }

    this.runningSyncs.add(feedSourceId);

    try {
      this.logger.log(`Starting synchronization for FeedSource ${feedSourceId} url=${feedUrl}`);

      // Fetch and normalize the feed
      const rawFeed = await this.fetcherService.fetchFeed(feedSource.url);
      const parsedFeed = this.parserService.parse(rawFeed);
      const normalizedFeed = this.normalizerService.normalize(parsedFeed, feedSource.url);

      // Execute synchronization
      const syncResult = await this.synchronizationService.synchronize(normalizedFeed);

      const finishedAt = new Date();

      this.logger.log(`Synchronization completed for FeedSource ${feedSourceId}`);

      return {
        status: syncResult.failed ? 'FAILED' : 'SUCCESS',
        feedSourceId,
        startedAt,
        finishedAt,
        processedPodcasts: syncResult.podcastInserted + syncResult.podcastUpdated,
        processedEpisodes: syncResult.episodeInserted + syncResult.episodeUpdated,
      };
    } catch (error) {
      const finishedAt = new Date();
      const errorMessage = error instanceof Error ? error.message : String(error);

      this.logger.error(`Synchronization failed for FeedSource ${feedSourceId}: ${errorMessage}`);

      try {
        await this.prisma.feedSource.update({
          where: { id: feedSourceId },
          data: {
            syncStatus: 'FAILED',
            lastError: errorMessage,
          },
        });
      } catch (stateError) {
        this.logger.warn(`FeedSource status update failed after orchestrator error: ${stateError instanceof Error ? stateError.message : String(stateError)}`);
      }

      return {
        status: 'FAILED',
        feedSourceId,
        startedAt,
        finishedAt,
        processedPodcasts: 0,
        processedEpisodes: 0,
        errorMessage,
      };
    } finally {
      this.runningSyncs.delete(feedSourceId);
    }
  }

  async syncAllFeedSources(): Promise<BatchSyncResultDto> {
    const feedSources = await this.prisma.feedSource.findMany({
      orderBy: { createdAt: 'asc' },
    });

    const results: BatchSyncResultDto['results'] = [];
    let successful = 0;
    let failed = 0;

    for (const feedSource of feedSources) {
      try {
        const result = await this.syncFeedSource(feedSource.id);
        results.push({
          feedSourceId: feedSource.id,
          url: feedSource.url,
          status: result.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED',
          errorMessage: result.errorMessage,
        });

        if (result.status === 'SUCCESS') {
          successful += 1;
        } else {
          failed += 1;
        }
      } catch (error) {
        failed += 1;
        results.push({
          feedSourceId: feedSource.id,
          url: feedSource.url,
          status: 'FAILED',
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return {
      processedFeeds: feedSources.length,
      successful,
      failed,
      results,
    };
  }

  async getFeedSourceStatus(feedSourceId: string): Promise<FeedSourceStatusDto> {
    const feedSource = await this.prisma.feedSource.findUnique({
      where: { id: feedSourceId },
    });

    if (!feedSource) {
      throw new NotFoundException(`FeedSource with ID ${feedSourceId} not found`);
    }

    return {
      id: feedSource.id,
      url: feedSource.url,
      syncStatus: feedSource.syncStatus,
      lastSyncedAt: feedSource.lastSyncedAt,
      lastError: feedSource.lastError,
    };
  }

  async getAllFeedSourcesStatus(): Promise<FeedSourceStatusDto[]> {
    const feedSources = await this.prisma.feedSource.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return feedSources.map((fs) => ({
      id: fs.id,
      url: fs.url,
      syncStatus: fs.syncStatus,
      lastSyncedAt: fs.lastSyncedAt,
      lastError: fs.lastError,
    }));
  }
}
