const assert = require('node:assert/strict');
const test = require('node:test');
const { RssSyncOrchestrator } = require('./rss-sync.orchestrator');
const { NotFoundException, ConflictException } = require('@nestjs/common');

test('RssSyncOrchestrator', async (t) => {
  const createMockServices = () => ({
    prisma: {
      feedSource: {
        findUnique: async (args: any) => {
          if (args.where.id === 'not-found') return null;
          if (args.where.id === 'feed-1') {
            return {
              id: 'feed-1',
              url: 'https://example.com/feed.xml',
              type: 'RSS',
              syncStatus: 'IDLE',
              lastSyncedAt: null,
              lastError: null,
              createdAt: new Date(),
              updatedAt: new Date(),
              podcastId: null,
            };
          }
          return null;
        },
        findMany: async () => [
          {
            id: 'feed-1',
            url: 'https://example.com/feed1.xml',
            type: 'RSS',
            syncStatus: 'IDLE',
            lastSyncedAt: null,
            lastError: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            podcastId: null,
          },
        ],
      },
    },
    synchronizationService: {
      synchronize: async () => ({
        podcastInserted: 1,
        podcastUpdated: 0,
        episodeInserted: 1,
        episodeUpdated: 0,
        episodeIgnored: 0,
        noOp: false,
        failed: false,
        podcast: { id: 'podcast-1', title: 'Test Podcast', rssUrl: 'https://example.com/feed.xml' },
        episodes: [{ id: 'ep-1', title: 'Episode 1' }],
      }),
    },
    fetcherService: {
      fetchFeed: async () => '<rss>...</rss>',
    },
    parserService: {
      parse: () => ({
        podcast: { title: 'Test Podcast', rssUrl: 'https://example.com/feed.xml' },
        episodes: [{ title: 'Episode 1', guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3' }],
      }),
    },
    normalizerService: {
      normalize: () => ({
        podcast: { title: 'Test Podcast', rssUrl: 'https://example.com/feed.xml' },
        episodes: [{ title: 'Episode 1', guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3' }],
      }),
    },
  });

  await t.test('syncFeedSource', async (t) => {
    await t.test('should synchronize a single FeedSource successfully', async () => {
      const services = createMockServices();
      const orchestrator = new RssSyncOrchestrator(
        services.prisma,
        services.synchronizationService,
        services.fetcherService,
        services.parserService,
        services.normalizerService,
      );

      const result = await orchestrator.syncFeedSource('feed-1');

      assert.equal(result.status, 'SUCCESS');
      assert.equal(result.feedSourceId, 'feed-1');
      assert.equal(result.processedPodcasts, 1);
      assert.equal(result.processedEpisodes, 1);
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const services = createMockServices();
      const orchestrator = new RssSyncOrchestrator(
        services.prisma,
        services.synchronizationService,
        services.fetcherService,
        services.parserService,
        services.normalizerService,
      );

      try {
        await orchestrator.syncFeedSource('not-found');
        assert.fail('Expected NotFoundException');
      } catch (error: any) {
        assert(error instanceof NotFoundException);
      }
    });

    await t.test('should return FAILED status on synchronization error', async () => {
      const services = createMockServices();
      services.fetcherService.fetchFeed = async () => {
        throw new Error('Network error');
      };

      const orchestrator = new RssSyncOrchestrator(
        services.prisma,
        services.synchronizationService,
        services.fetcherService,
        services.parserService,
        services.normalizerService,
      );

      const result = await orchestrator.syncFeedSource('feed-1');

      assert.equal(result.status, 'FAILED');
      assert(result.errorMessage?.includes('Network error'));
      assert.equal(result.processedPodcasts, 0);
      assert.equal(result.processedEpisodes, 0);
    });
  });

  await t.test('syncAllFeedSources', async (t) => {
    await t.test('should synchronize all FeedSources sequentially', async () => {
      const services = createMockServices();
      const orchestrator = new RssSyncOrchestrator(
        services.prisma,
        services.synchronizationService,
        services.fetcherService,
        services.parserService,
        services.normalizerService,
      );

      const result = await orchestrator.syncAllFeedSources();

      assert.equal(result.processedFeeds, 1);
      assert(result.successful > 0 || result.failed > 0);
    });
  });

  await t.test('getFeedSourceStatus', async (t) => {
    await t.test('should return FeedSource status', async () => {
      const services = createMockServices();
      const orchestrator = new RssSyncOrchestrator(
        services.prisma,
        services.synchronizationService,
        services.fetcherService,
        services.parserService,
        services.normalizerService,
      );

      const result = await orchestrator.getFeedSourceStatus('feed-1');

      assert.equal(result.id, 'feed-1');
      assert.equal(result.syncStatus, 'IDLE');
      assert.equal(result.lastError, null);
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const services = createMockServices();
      const orchestrator = new RssSyncOrchestrator(
        services.prisma,
        services.synchronizationService,
        services.fetcherService,
        services.parserService,
        services.normalizerService,
      );

      try {
        await orchestrator.getFeedSourceStatus('not-found');
        assert.fail('Expected NotFoundException');
      } catch (error: any) {
        assert(error instanceof NotFoundException);
      }
    });
  });

  await t.test('getAllFeedSourcesStatus', async (t) => {
    await t.test('should return status for all FeedSources', async () => {
      const services = createMockServices();
      const orchestrator = new RssSyncOrchestrator(
        services.prisma,
        services.synchronizationService,
        services.fetcherService,
        services.parserService,
        services.normalizerService,
      );

      const result = await orchestrator.getAllFeedSourcesStatus();

      assert.equal(result.length, 1);
      assert.equal(result[0].id, 'feed-1');
    });

    await t.test('should return empty array when no FeedSources exist', async () => {
      const services = createMockServices();
      services.prisma.feedSource.findMany = async () => [];

      const orchestrator = new RssSyncOrchestrator(
        services.prisma,
        services.synchronizationService,
        services.fetcherService,
        services.parserService,
        services.normalizerService,
      );

      const result = await orchestrator.getAllFeedSourcesStatus();

      assert.equal(result.length, 0);
    });
  });
});
