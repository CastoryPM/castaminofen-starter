const assert = require('node:assert/strict');
const test = require('node:test');
const { RssSyncController } = require('./rss-sync.controller');
const { NotFoundException, ConflictException, InternalServerErrorException } = require('@nestjs/common');

test('RssSyncController', async (t) => {
  const createMockOrchestrator = () => ({
    syncFeedSource: async (feedSourceId: string) => {
      if (feedSourceId === 'not-found') {
        throw new NotFoundException('FeedSource not found');
      }
      if (feedSourceId === 'conflict') {
        throw new ConflictException('Synchronization already running');
      }
      if (feedSourceId === 'error') {
        throw new Error('Unexpected error');
      }
      return {
        status: 'SUCCESS',
        feedSourceId,
        startedAt: new Date(),
        finishedAt: new Date(),
        processedPodcasts: 1,
        processedEpisodes: 5,
      };
    },
    syncAllFeedSources: async () => ({
      processedFeeds: 3,
      successful: 2,
      failed: 1,
      results: [
        { feedSourceId: 'feed-1', url: 'https://example.com/feed1.xml', status: 'SUCCESS' },
        { feedSourceId: 'feed-2', url: 'https://example.com/feed2.xml', status: 'SUCCESS' },
        {
          feedSourceId: 'feed-3',
          url: 'https://example.com/feed3.xml',
          status: 'FAILED',
          errorMessage: 'Network error',
        },
      ],
    }),
    getFeedSourceStatus: async (feedSourceId: string) => {
      if (feedSourceId === 'not-found') {
        throw new NotFoundException('FeedSource not found');
      }
      return {
        id: feedSourceId,
        url: 'https://example.com/feed.xml',
        syncStatus: 'SUCCESS',
        lastSyncedAt: new Date(),
        lastError: null,
      };
    },
    getAllFeedSourcesStatus: async () => [
      {
        id: 'feed-1',
        url: 'https://example.com/feed1.xml',
        syncStatus: 'SUCCESS',
        lastSyncedAt: new Date(),
        lastError: null,
      },
      {
        id: 'feed-2',
        url: 'https://example.com/feed2.xml',
        syncStatus: 'FAILED',
        lastSyncedAt: new Date(),
        lastError: 'Network timeout',
      },
    ],
  });

  await t.test('syncFeedSource', async (t) => {
    await t.test('should synchronize a single FeedSource and return success', async () => {
      const orchestrator = createMockOrchestrator();
      const controller = new RssSyncController(orchestrator);

      const result = await controller.syncFeedSource('feed-1');

      assert.equal(result.status, 'SUCCESS');
      assert.equal(result.feedSourceId, 'feed-1');
      assert.equal(result.processedPodcasts, 1);
      assert.equal(result.processedEpisodes, 5);
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const orchestrator = createMockOrchestrator();
      const controller = new RssSyncController(orchestrator);

      try {
        await controller.syncFeedSource('not-found');
        assert.fail('Expected NotFoundException');
      } catch (error: any) {
        assert(error instanceof NotFoundException);
      }
    });

    await t.test('should throw ConflictException when synchronization is already running', async () => {
      const orchestrator = createMockOrchestrator();
      const controller = new RssSyncController(orchestrator);

      try {
        await controller.syncFeedSource('conflict');
        assert.fail('Expected ConflictException');
      } catch (error: any) {
        assert(error instanceof ConflictException);
      }
    });

    await t.test('should throw InternalServerErrorException on unexpected error', async () => {
      const orchestrator = createMockOrchestrator();
      const controller = new RssSyncController(orchestrator);

      try {
        await controller.syncFeedSource('error');
        assert.fail('Expected InternalServerErrorException');
      } catch (error: any) {
        assert(error instanceof InternalServerErrorException);
      }
    });
  });

  await t.test('syncAllFeedSources', async (t) => {
    await t.test('should synchronize all FeedSources and return batch results', async () => {
      const orchestrator = createMockOrchestrator();
      const controller = new RssSyncController(orchestrator);

      const result = await controller.syncAllFeedSources();

      assert.equal(result.processedFeeds, 3);
      assert.equal(result.successful, 2);
      assert.equal(result.failed, 1);
      assert.equal(result.results.length, 3);
    });
  });

  await t.test('getFeedSourceStatus', async (t) => {
    await t.test('should return status for a specific FeedSource', async () => {
      const orchestrator = createMockOrchestrator();
      const controller = new RssSyncController(orchestrator);

      const result = await controller.getFeedSourceStatus('feed-1');

      assert.equal(result.id, 'feed-1');
      assert.equal(result.syncStatus, 'SUCCESS');
      assert.equal(result.lastError, null);
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const orchestrator = createMockOrchestrator();
      const controller = new RssSyncController(orchestrator);

      try {
        await controller.getFeedSourceStatus('not-found');
        assert.fail('Expected NotFoundException');
      } catch (error: any) {
        assert(error instanceof NotFoundException);
      }
    });
  });

  await t.test('getStatus', async (t) => {
    await t.test('should return status for all FeedSources', async () => {
      const orchestrator = createMockOrchestrator();
      const controller = new RssSyncController(orchestrator);

      const result = await controller.getStatus();

      assert.equal(result.length, 2);
      assert.equal(result[0].syncStatus, 'SUCCESS');
      assert.equal(result[1].syncStatus, 'FAILED');
    });
  });
});
