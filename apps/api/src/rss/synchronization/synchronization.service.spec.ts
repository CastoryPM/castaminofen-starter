const assert = require('node:assert/strict');
const test = require('node:test');
const { MatchingService } = require('../matching/matching.service');
const { SynchronizationService } = require('./synchronization.service');

function createPersistenceStub(initialState: { podcast?: any; episodes?: any[]; feedSource?: any } = {}) {
  const podcast = initialState.podcast ?? null;
  const episodes = initialState.episodes ?? [];
  const feedSource = {
    id: 'feed-1',
    url: 'https://example.com/feed.xml',
    syncStatus: 'IDLE',
    lastSyncedAt: null as Date | null,
    lastError: null as string | null,
    ...(initialState.feedSource ?? {}),
  };

  return {
    state: feedSource,
    ensureFeedSource: async (_tx: unknown, url: string) => ({ id: feedSource.id, url }),
    updateFeedSourceState: async (_tx: unknown, _id: string, data: { syncStatus?: string; lastSyncedAt?: Date | null; lastError?: string | null }) => {
      if (data.syncStatus !== undefined) {
        feedSource.syncStatus = data.syncStatus;
      }
      if (data.lastSyncedAt !== undefined) {
        feedSource.lastSyncedAt = data.lastSyncedAt;
      }
      if (data.lastError !== undefined) {
        feedSource.lastError = data.lastError;
      }
      return feedSource;
    },
    findPodcastByRssUrl: async (_tx: unknown) => podcast,
    findEpisodesByPodcastId: async (_tx: unknown) => episodes,
    createPodcast: async (_tx: unknown, _feed: unknown, _feedSourceId: string) => ({ id: 'podcast-1', title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' }),
    updatePodcast: async (_tx: unknown, id: string, data: unknown) => ({ id, ...(data as Record<string, unknown>) }),
    createEpisode: async (_tx: unknown, _podcastId: string, episode: unknown) => ({ id: 'episode-1', ...(episode as Record<string, unknown>) }),
    updateEpisode: async (_tx: unknown, id: string, data: unknown) => ({ id, ...(data as Record<string, unknown>) }),
  };
}

test('synchronization inserts podcast and episode on first run', async () => {
  const persistence = createPersistenceStub();
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(new MatchingService(), persistence as never, prisma as never);

  const result = await service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [{ title: 'Example Episode', guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3' }],
  } as never);

  assert.equal(result.podcastInserted, 1);
  assert.equal(result.episodeInserted, 1);
  assert.equal(result.noOp, false);
});

test('synchronization does not create duplicates on repeated runs', async () => {
  const persistence = createPersistenceStub({
    podcast: { id: 'podcast-1', title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml', description: null, website: null, artworkUrl: null },
    episodes: [{ id: 'episode-1', title: 'Example Episode', guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3', description: null, duration: null, publishedAt: null }],
  });
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(new MatchingService(), persistence as never, prisma as never);

  const result = await service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [{ title: 'Example Episode', guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3' }],
  } as never);

  assert.equal(result.podcastInserted, 0);
  assert.equal(result.episodeInserted, 0);
  assert.equal(result.noOp, true);
});

test('synchronization updates mutable podcast and episode fields only', async () => {
  const persistence = createPersistenceStub({
    podcast: { id: 'podcast-1', title: 'Old Title', rssUrl: 'https://example.com/feed.xml', description: null, website: null, artworkUrl: null },
    episodes: [{ id: 'episode-1', title: 'Old Episode', guid: 'guid-1', audioUrl: 'https://example.com/old.mp3', description: null, duration: null, publishedAt: null }],
  });
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(new MatchingService(), persistence as never, prisma as never);

  const result = await service.synchronize({
    podcast: { title: 'New Title', description: 'Fresh description', rssUrl: 'https://example.com/feed.xml' },
    episodes: [{ title: 'New Episode', description: 'Updated description', guid: 'guid-1', audioUrl: 'https://example.com/new.mp3', duration: 123 }],
  } as never);

  assert.equal(result.podcastUpdated, 1);
  assert.equal(result.episodeUpdated, 1);
});

test('synchronization ignores invalid episodes without aborting the feed', async () => {
  const persistence = createPersistenceStub();
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(new MatchingService(), persistence as never, prisma as never);

  const result = await service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [{ title: '', guid: null, audioUrl: null }, { title: 'Valid Episode', guid: 'guid-2', audioUrl: 'https://example.com/valid.mp3' }],
  } as never);

  assert.equal(result.episodeIgnored, 1);
  assert.equal(result.episodeInserted, 1);
});

test('synchronization reports partial success when some episodes are ignored', async () => {
  const persistence = createPersistenceStub({
    podcast: { id: 'podcast-1', title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml', description: null, website: null, artworkUrl: null },
    episodes: [{ id: 'episode-1', title: 'Existing Episode', guid: 'guid-1', audioUrl: 'https://example.com/existing.mp3', description: null, duration: null, publishedAt: null }],
  });
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(new MatchingService(), persistence as never, prisma as never);

  const result = await service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [{ title: 'Existing Episode', guid: 'guid-1', audioUrl: 'https://example.com/existing.mp3' }, { title: '', guid: null, audioUrl: null }],
  } as never);

  assert.equal(result.episodeUpdated, 0);
  assert.equal(result.episodeIgnored, 1);
});

test('synchronization marks the run as failed on database errors', async () => {
  const persistence = createPersistenceStub();
  const prisma = {
    $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}),
  };
  const service = new SynchronizationService(new MatchingService(), {
    ...persistence,
    createPodcast: async () => {
      throw new Error('database failure');
    },
  } as never, prisma as never);

  const result = await service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [],
  } as never);

  assert.equal(result.failed, true);
});

test('synchronization keeps feed source idle, running, and successful states deterministic', async () => {
  const persistence = createPersistenceStub();
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(new MatchingService(), persistence as never, prisma as never);

  assert.equal(persistence.state.syncStatus, 'IDLE');

  persistence.createPodcast = async () => {
    await new Promise<void>((resolve) => setImmediate(resolve));
    return { id: 'podcast-1', title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' };
  };

  const firstRun = service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [],
  } as never);

  await Promise.resolve();
  assert.equal(persistence.state.syncStatus, 'RUNNING');

  await firstRun;

  assert.equal(persistence.state.syncStatus, 'SUCCESS');
  assert.ok(persistence.state.lastSyncedAt instanceof Date);
  assert.equal(persistence.state.lastError, null);
});

test('synchronization records failure state and preserves the last synced timestamp', async () => {
  const existingSyncedAt = new Date('2026-01-01T00:00:00.000Z');
  const persistence = createPersistenceStub({
    feedSource: {
      lastSyncedAt: existingSyncedAt,
    },
  });
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(new MatchingService(), {
    ...persistence,
    createPodcast: async () => {
      throw new Error('database failure');
    },
  } as never, prisma as never);

  const result = await service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [],
  } as never);

  assert.equal(result.failed, true);
  assert.equal(persistence.state.syncStatus, 'FAILED');
  assert.equal(persistence.state.lastSyncedAt, existingSyncedAt);
  assert.equal(persistence.state.lastError, 'database failure');
});

test('synchronization prevents concurrent execution for the same feed source', async () => {
  const persistence = createPersistenceStub();
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(new MatchingService(), persistence as never, prisma as never);

  persistence.createPodcast = async () => {
    await new Promise<void>((resolve) => setImmediate(resolve));
    return { id: 'podcast-1', title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' };
  };

  const firstRun = service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [],
  } as never);

  await Promise.resolve();
  const secondRun = await service.synchronize({
    podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' },
    episodes: [],
  } as never);

  assert.equal(secondRun.noOp, true);
  assert.equal(persistence.state.syncStatus, 'RUNNING');

  await firstRun;
  assert.equal(persistence.state.syncStatus, 'SUCCESS');
});

test('orchestrator performs a complete feed synchronization workflow', async () => {
  const persistence = createPersistenceStub();
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(
    new MatchingService(),
    persistence as never,
    prisma as never,
    { fetchFeed: async () => '<rss><channel><title>Example Podcast</title><description>Demo</description><link>https://example.com</link><item><title>Example Episode</title><guid>guid-1</guid><enclosure url="https://example.com/audio.mp3"/></item></channel></rss>' } as never,
    { parse: () => ({ podcast: { title: 'Example Podcast', description: 'Demo', link: 'https://example.com' }, episodes: [{ title: 'Example Episode', guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3' }] }) } as never,
    { normalize: () => ({ podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' }, episodes: [{ title: 'Example Episode', guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3' }] }) } as never,
  );

  const result = await service.synchronize('https://example.com/feed.xml');

  assert.equal(result.podcastInserted, 1);
  assert.equal(result.episodeInserted, 1);
  assert.equal(result.failed, false);
  assert.equal(persistence.state.syncStatus, 'SUCCESS');
  assert.equal(persistence.state.lastError, null);
});

test('orchestrator records feed-not-found failures without corrupting state', async () => {
  const persistence = createPersistenceStub();
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const service = new SynchronizationService(
    new MatchingService(),
    persistence as never,
    prisma as never,
    { fetchFeed: async () => { throw new Error('feed not found'); } } as never,
    { parse: () => ({ podcast: {}, episodes: [] }) } as never,
    { normalize: () => ({ podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' }, episodes: [] }) } as never,
  );

  const result = await service.synchronize('https://example.com/feed.xml');

  assert.equal(result.failed, true);
  assert.equal(persistence.state.syncStatus, 'FAILED');
  assert.equal(persistence.state.lastError, 'feed not found');
});

test('orchestrator propagates parser and normalization failures', async () => {
  const persistence = createPersistenceStub();
  const prisma = { $transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}) };
  const parserFailureService = new SynchronizationService(
    new MatchingService(),
    persistence as never,
    prisma as never,
    { fetchFeed: async () => '<rss />' } as never,
    { parse: () => { throw new Error('invalid XML'); } } as never,
    { normalize: () => ({ podcast: { title: 'Example Podcast', rssUrl: 'https://example.com/feed.xml' }, episodes: [] }) } as never,
  );

  const parserFailure = await parserFailureService.synchronize('https://example.com/feed.xml');
  assert.equal(parserFailure.failed, true);
  assert.equal(persistence.state.lastError, 'invalid XML');

  const normalizationFailureService = new SynchronizationService(
    new MatchingService(),
    persistence as never,
    prisma as never,
    { fetchFeed: async () => '<rss />' } as never,
    { parse: () => ({ podcast: {}, episodes: [] }) } as never,
    { normalize: () => { throw new Error('normalization failed'); } } as never,
  );

  const normalizationFailure = await normalizationFailureService.synchronize('https://example.com/feed.xml');
  assert.equal(normalizationFailure.failed, true);
  assert.equal(persistence.state.lastError, 'normalization failed');
});
