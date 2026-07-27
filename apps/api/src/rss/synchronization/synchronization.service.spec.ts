const assert = require('node:assert/strict');
const test = require('node:test');
const { MatchingService } = require('../matching/matching.service');
const { SynchronizationService } = require('./synchronization.service');

function createPersistenceStub(initialState: { podcast?: any; episodes?: any[] } = {}) {
  const podcast = initialState.podcast ?? null;
  const episodes = initialState.episodes ?? [];

  return {
    ensureFeedSource: async (_tx: unknown, url: string) => ({ id: 'feed-1', url }),
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
