const assert = require('node:assert/strict');
const test = require('node:test');
const { BadRequestException } = require('@nestjs/common');
const { ImporterService } = require('../importer/importer.service');
const { RssPersistenceService } = require('./rss-persistence.service');

test('ImporterService forwards normalized feed data to the persistence service', async () => {
  const persisted: Array<{ podcast: unknown; episodes: unknown[] }> = [];
  const persistenceService = {
    persistNormalizedFeed: async (feed: unknown) => {
      persisted.push(feed as { podcast: unknown; episodes: unknown[] });
      return { podcast: { id: 'podcast-1' }, episodes: [] };
    },
  };

  const importer = new ImporterService(
    {
      fetchFeed: async () => '<rss />',
    } as never,
    {
      parse: () => ({ podcast: {}, episodes: [] }),
    } as never,
    {
      normalize: () => ({ podcast: { title: 'Example', rssUrl: 'https://example.com/feed.xml' }, episodes: [] }),
    } as never,
    persistenceService as never,
  );

  const result = await importer.importFeedAndPersist('https://example.com/feed.xml');

  assert.equal(result.podcast.id, 'podcast-1');
  assert.equal(persisted.length, 1);
  assert.deepEqual(persisted[0].podcast, { title: 'Example', rssUrl: 'https://example.com/feed.xml' });
});

test('RssPersistenceService creates podcast and episode records from normalized data', async () => {
  const created: Array<{ model: string; data: unknown }> = [];
  const prisma = {
    $transaction: async (fn: (tx: any) => Promise<unknown>) => fn({
      feedSource: {
        upsert: async ({ where }: { where: { url: string } }) => {
          created.push({ model: 'feedSource', data: where });
          return { id: 'feed-1' };
        },
      },
      podcast: {
        findUnique: async () => null,
        create: async ({ data }: { data: unknown }) => {
          created.push({ model: 'podcast', data });
          return { id: 'podcast-1', ...(data as Record<string, unknown>) };
        },
      },
      episode: {
        create: async ({ data }: { data: unknown }) => {
          created.push({ model: 'episode', data });
          return { id: 'episode-1', ...(data as Record<string, unknown>) };
        },
      },
    }),
  };

  const service = new RssPersistenceService(prisma as never);
  const normalizedFeed = {
    podcast: {
      title: 'Example Podcast',
      rssUrl: 'https://example.com/feed.xml',
    },
    episodes: [
      {
        title: 'Example Episode',
        guid: 'guid-1',
        audioUrl: 'https://example.com/audio.mp3',
      },
    ],
  };

  const result = await service.persistNormalizedFeed(normalizedFeed as never);

  assert.equal(result.podcast.id, 'podcast-1');
  assert.equal(result.episodes[0].id, 'episode-1');
  assert.equal(created.filter((item) => item.model === 'podcast').length, 1);
  assert.equal(created.filter((item) => item.model === 'episode').length, 1);
});

test('RssPersistenceService rejects invalid persistence input', async () => {
  const service = new RssPersistenceService({} as never);

  await assert.rejects(
    () => service.persistNormalizedFeed({ podcast: { rssUrl: 'https://example.com/feed.xml' }, episodes: [] } as never),
    BadRequestException,
  );
});
