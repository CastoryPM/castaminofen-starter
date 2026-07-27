import { Controller, Post, Get, Param, HttpCode, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { RssSyncOrchestrator, SyncResultDto, BatchSyncResultDto, FeedSourceStatusDto } from '../orchestration/rss-sync.orchestrator';

@Controller('api/v1/internal/rss')
export class RssSyncController {
  constructor(private readonly orchestrator: RssSyncOrchestrator) {}

  @Post('sync/:feedSourceId')
  @HttpCode(200)
  async syncFeedSource(@Param('feedSourceId') feedSourceId: string): Promise<SyncResultDto> {
    try {
      return await this.orchestrator.syncFeedSource(feedSourceId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Synchronization failed unexpectedly');
    }
  }

  /**
   * POST /api/v1/internal/rss/sync
   * Synchronize all available FeedSources sequentially.
   */
  @Post('sync')
  @HttpCode(200)
  async syncAllFeedSources(): Promise<BatchSyncResultDto> {
    try {
      return await this.orchestrator.syncAllFeedSources();
    } catch {
      throw new InternalServerErrorException('Batch synchronization failed unexpectedly');
    }
  }

  /**
   * GET /api/v1/internal/rss/status
   * Return operational synchronization status.
   */
  @Get('status')
  @HttpCode(200)
  async getStatus(): Promise<FeedSourceStatusDto[]> {
    try {
      return await this.orchestrator.getAllFeedSourcesStatus();
    } catch {
      throw new InternalServerErrorException('Failed to retrieve synchronization status');
    }
  }

  /**
   * GET /api/v1/internal/rss/status/:feedSourceId
   * Return operational synchronization status for a specific FeedSource.
   */
  @Get('status/:feedSourceId')
  @HttpCode(200)
  async getFeedSourceStatus(@Param('feedSourceId') feedSourceId: string): Promise<FeedSourceStatusDto> {
    try {
      return await this.orchestrator.getFeedSourceStatus(feedSourceId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve synchronization status');
    }
  }
}
