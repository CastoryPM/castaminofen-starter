const test = require('node:test');
const assert = require('node:assert/strict');
const { PrismaService } = require('../src/prisma/prisma.service');
const { RssSyncOrchestrator } = require('../src/rss/orchestration/rss-sync.orchestrator');
const { SynchronizationService } = require('../src/rss/synchronization/synchronization.service');
const { RssPersistenceService } = require('../src/rss/persistence/rss-persistence.service');
const { MatchingService } = require('../src/rss/matching/matching.service');
const { ParserService } = require('../src/rss/parser/parser.service');
const { NormalizerService } = require('../src/rss/normalizer/normalizer.service');

// Integration tests for RSS end-to-end validation. These tests require a running
// database configured via DATABASE_URL. If DATABASE_URL is not set, the tests
// are skipped so the test suite can still run in environments without a DB.

function shouldRunIntegration() {
  return Boolean(process.env.DATABASE_URL);
}

if (!shouldRunIntegration()) {
  test('rss-e2e: skipped (no DATABASE_URL)', () => {});
} else {
  test('rss-e2e: end-to-end RSS synchronization scenarios', async (t) => {
    const prisma = new PrismaService();
    await prisma.$connect();

    const parser = new ParserService();
    const normalizer = new NormalizerService();

    // Helper to create synchronization service with DB-backed persistence
    function createSynchronization(prismaClient) {
      const persistence = {
        ensureFeedSource: async (tx, url) => tx.feedSource.upsert({ where: { url }, update: {}, create: { url, type: 'RSS' } }),
        updateFeedSourceState: async (tx, feedSourceId, data) => {
          const updateData = {};
          if (data.syncStatus !== undefined) updateData.syncStatus = data.syncStatus;
          if (data.lastSyncedAt !== undefined) updateData.lastSyncedAt = data.lastSyncedAt;
          if (data.lastError !== undefined) updateData.lastError = data.lastError;
          return tx.feedSource.update({ where: { id: feedSourceId }, data: updateData });
        },
        findPodcastByRssUrl: async (tx, rssUrl) => tx.podcast.findFirst({ where: { rssUrl } }),
        findEpisodesByPodcastId: async (tx, podcastId) => tx.episode.findMany({ where: { podcastId } }),
        createPodcast: async (tx, feedData, feedSourceId) => tx.podcast.create({ data: { title: feedData.title, rssUrl: feedData.rssUrl ?? '', description: feedData.description ?? null, website: feedData.website ?? null, artworkUrl: feedData.artworkUrl ?? null, feedSourceId } }),
        updatePodcast: async (tx, podcastId, data) => tx.podcast.update({ where: { id: podcastId }, data: { title: data.title, description: data.description ?? null, website: data.website ?? null, artworkUrl: data.artworkUrl ?? null } }),
        createEpisode: async (tx, podcastId, episode) => tx.episode.create({ data: { podcastId, title: episode.title, description: episode.description ?? null, guid: episode.guid ?? null, audioUrl: episode.audioUrl ?? null, duration: episode.duration ?? null, publishedAt: episode.publishedAt ?? null } }),
        updateEpisode: async (tx, episodeId, data) => tx.episode.update({ where: { id: episodeId }, data: { title: data.title, description: data.description ?? null, guid: data.guid ?? null, audioUrl: data.audioUrl ?? null, duration: data.duration ?? null, publishedAt: data.publishedAt ?? null } }),
      };

      return new SynchronizationService(new MatchingService(), persistence, prismaClient);
    }

    // Clean helper
    async function cleanup(prefix) {
      await prisma.episode.deleteMany({ where: { title: { startsWith: prefix } } }).catch(() => {});
      await prisma.podcast.deleteMany({ where: { title: { startsWith: prefix } } }).catch(() => {});
      await prisma.feedSource.deleteMany({ where: { url: { startsWith: 'https://test.feed/' } } }).catch(() => {});
    }

    const prefix = `E2E-${Date.now()}-`;

    await cleanup(prefix);

    await t.test('Scenario 1 — Successful synchronization', async () => {
      const url = `https://test.feed/success-${Date.now()}.xml`;
      const feed = await prisma.feedSource.create({ data: { url, type: 'RSS' } });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${prefix}Test Podcast</title>
    <link>https://example.com</link>
    <item>
      <title>${prefix}Episode 1</title>
      <guid>guid-1-${Date.now()}</guid>
      <pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate>
      <enclosure url="https://example.com/ep1.mp3" length="123" type="audio/mpeg" />
    </item>
  </channel>
</rss>`;

      const fetcher = { fetchFeed: async () => xml };
      const syncSvc = createSynchronization(prisma);
      const orchestrator = new RssSyncOrchestrator(prisma, syncSvc, fetcher, parser, normalizer);

      const result = await orchestrator.syncFeedSource(feed.id);

      assert.equal(result.status, 'SUCCESS');

      const podcast = await prisma.podcast.findFirst({ where: { rssUrl: url } });
      assert(podcast, 'podcast created');

      const episodes = await prisma.episode.findMany({ where: { podcastId: podcast.id } });
      assert.equal(episodes.length, 1);

      const feedSource = await prisma.feedSource.findUnique({ where: { id: feed.id } });
      assert.equal(feedSource.syncStatus, 'SUCCESS');
      assert.equal(feedSource.lastError, null);
    });

    await t.test('Scenario 2 — Repeated synchronization (idempotency)', async () => {
      const url = `https://test.feed/repeat-${Date.now()}.xml`;
      const feed = await prisma.feedSource.create({ data: { url, type: 'RSS' } });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${prefix}Repeat Podcast</title>
    <item>
      <title>${prefix}Repeat Episode</title>
      <guid>r-1-${Date.now()}</guid>
      <enclosure url="https://example.com/r1.mp3" length="123" type="audio/mpeg" />
    </item>
  </channel>
</rss>`;

      const fetcher = { fetchFeed: async () => xml };
      const syncSvc = createSynchronization(prisma);
      const orchestrator = new RssSyncOrchestrator(prisma, syncSvc, fetcher, parser, normalizer);

      const first = await orchestrator.syncFeedSource(feed.id);
      assert.equal(first.status, 'SUCCESS');

      const second = await orchestrator.syncFeedSource(feed.id);
      assert.equal(second.status, 'SUCCESS');

      const podcasts = await prisma.podcast.findMany({ where: { rssUrl: url } });
      assert.equal(podcasts.length, 1);

      const episodes = await prisma.episode.findMany({ where: { podcastId: podcasts[0].id } });
      assert.equal(episodes.length, 1);
    });

    await t.test('Scenario 3 — Episode updates preserve identity', async () => {
      const url = `https://test.feed/update-${Date.now()}.xml`;
      const feed = await prisma.feedSource.create({ data: { url, type: 'RSS' } });

      const guid = `u-ep-${Date.now()}`;
      const xmlV1 = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${prefix}Update Podcast</title>
    <item>
      <title>${prefix}Update Episode</title>
      <guid>${guid}</guid>
      <enclosure url="https://example.com/u1.mp3" length="123" type="audio/mpeg" />
      <description>first</description>
    </item>
  </channel>
</rss>`;

      const xmlV2 = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${prefix}Update Podcast</title>
    <item>
      <title>${prefix}Update Episode</title>
      <guid>${guid}</guid>
      <enclosure url="https://example.com/u1.mp3" length="123" type="audio/mpeg" />
      <description>updated description</description>
    </item>
  </channel>
</rss>`;

      const fetcher1 = { fetchFeed: async () => xmlV1 };
      const fetcher2 = { fetchFeed: async () => xmlV2 };

      const syncSvc1 = createSynchronization(prisma);
      const orchestrator1 = new RssSyncOrchestrator(prisma, syncSvc1, fetcher1, parser, normalizer);
      const r1 = await orchestrator1.syncFeedSource(feed.id);
      assert.equal(r1.status, 'SUCCESS');

      const podcast = await prisma.podcast.findFirst({ where: { rssUrl: url } });
      const episode = await prisma.episode.findFirst({ where: { podcastId: podcast.id } });
      const updatedAtBefore = episode.updatedAt;

      // run with updated XML
      const syncSvc2 = createSynchronization(prisma);
      const orchestrator2 = new RssSyncOrchestrator(prisma, syncSvc2, fetcher2, parser, normalizer);
      const r2 = await orchestrator2.syncFeedSource(feed.id);
      assert.equal(r2.status, 'SUCCESS');

      const episodeAfter = await prisma.episode.findFirst({ where: { id: episode.id } });
      assert.equal(episodeAfter.guid, guid);
      assert.notEqual(episodeAfter.updatedAt.getTime(), new Date(updatedAtBefore).getTime());
    });

    await t.test('Scenario 5 — Feed unavailable results in FAILED state', async () => {
      const url = `https://test.feed/unavail-${Date.now()}.xml`;
      const feed = await prisma.feedSource.create({ data: { url, type: 'RSS' } });

      const fetcher = { fetchFeed: async () => { throw new Error('Network unreachable'); } };
      const syncSvc = createSynchronization(prisma);
      const orchestrator = new RssSyncOrchestrator(prisma, syncSvc, fetcher, parser, normalizer);

      const r = await orchestrator.syncFeedSource(feed.id);
      assert.equal(r.status, 'FAILED');

      const feedSource = await prisma.feedSource.findUnique({ where: { id: feed.id } });
      assert.equal(feedSource.syncStatus, 'FAILED');
      assert(feedSource.lastError && feedSource.lastError.includes('Network'));
    });

    await t.test('Scenario 6 — Invalid XML handled safely', async () => {
      const url = `https://test.feed/invalid-${Date.now()}.xml`;
      const feed = await prisma.feedSource.create({ data: { url, type: 'RSS' } });

      const fetcher = { fetchFeed: async () => '<invalid/>' };
      const syncSvc = createSynchronization(prisma);
      const orchestrator = new RssSyncOrchestrator(prisma, syncSvc, fetcher, parser, normalizer);

      const r = await orchestrator.syncFeedSource(feed.id);
      assert.equal(r.status, 'FAILED');

      const podcast = await prisma.podcast.findFirst({ where: { rssUrl: url } });
      assert.equal(podcast, null);
    });

    await t.test('Scenario 7 — Partial failure: invalid episodes ignored', async () => {
      const url = `https://test.feed/partial-${Date.now()}.xml`;
      const feed = await prisma.feedSource.create({ data: { url, type: 'RSS' } });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${prefix}Partial Podcast</title>
    <item>
      <title>${prefix}Good Episode</title>
      <guid>p-good-${Date.now()}</guid>
      <enclosure url="https://example.com/good.mp3" />
    </item>
    <item>
      <description>no identity here</description>
    </item>
  </channel>
</rss>`;

      const fetcher = { fetchFeed: async () => xml };
      const syncSvc = createSynchronization(prisma);
      const orchestrator = new RssSyncOrchestrator(prisma, syncSvc, fetcher, parser, normalizer);

      const r = await orchestrator.syncFeedSource(feed.id);
      assert.equal(r.status, 'SUCCESS');

      const podcast = await prisma.podcast.findFirst({ where: { rssUrl: url } });
      const episodes = await prisma.episode.findMany({ where: { podcastId: podcast.id } });
      assert.equal(episodes.length, 1);
    });

    await t.test('Scenario 8 — Empty feed succeeds gracefully', async () => {
      const url = `https://test.feed/empty-${Date.now()}.xml`;
      const feed = await prisma.feedSource.create({ data: { url, type: 'RSS' } });

      const xml = `<?xml version="1.0" encoding="UTF-8"?><rss><channel><title>${prefix}Empty</title></channel></rss>`;
      const fetcher = { fetchFeed: async () => xml };
      const syncSvc = createSynchronization(prisma);
      const orchestrator = new RssSyncOrchestrator(prisma, syncSvc, fetcher, parser, normalizer);

      const r = await orchestrator.syncFeedSource(feed.id);
      assert.equal(r.status, 'SUCCESS');
      const podcast = await prisma.podcast.findFirst({ where: { rssUrl: url } });
      assert(podcast);
      const eps = await prisma.episode.findMany({ where: { podcastId: podcast.id } });
      assert.equal(eps.length, 0);
    });

    await t.test('Scenario 9 — Existing Podcast reused and ownership preserved', async () => {
      // create a user and podcast with owner
      const user = await prisma.user.create({ data: { email: `e2e-owner-${Date.now()}@example.com`, password: 'x', name: 'owner' } });
      const url = `https://test.feed/owned-${Date.now()}.xml`;
      const podcast = await prisma.podcast.create({ data: { title: `${prefix}Owned`, rssUrl: url, ownerId: user.id } });
      const feed = await prisma.feedSource.create({ data: { url, type: 'RSS' } });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss><channel><title>${prefix}Owned</title>
  <item>
    <title>ep1</title>
    <guid>owned-1</guid>
    <enclosure url="https://example.com/owned1.mp3" />
  </item>
</channel></rss>`;

      const fetcher = { fetchFeed: async () => xml };
      const syncSvc = createSynchronization(prisma);
      const orchestrator = new RssSyncOrchestrator(prisma, syncSvc, fetcher, parser, normalizer);

      const r = await orchestrator.syncFeedSource(feed.id);
      assert.equal(r.status, 'SUCCESS');

      const podcastAfter = await prisma.podcast.findUnique({ where: { id: podcast.id } });
      assert.equal(podcastAfter.ownerId, user.id);
    });

    // Cleanup
    await cleanup(prefix);

    await prisma.$disconnect();
  });
}
