const assert = require('node:assert/strict');
const test = require('node:test');
const { mkdtempSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const {
  bootstrapFeedSources,
  FeedSourceSeederService,
} = require('./feed-seeder.service');
const { predefinedFeedSources, readRssFeedUrlsFromFile } = require('./feed-config');

const createMockPrisma = () => {
  const createCalls = [];
  return {
    feedSource: {
      findUnique: async ({ where }) => {
        if (!createCalls.length) {
          return null;
        }
        return createCalls.find((item) => item.url === where.url) ?? null;
      },
      create: async ({ data }) => {
        createCalls.push(data);
        return {
          id: `feed-${createCalls.length}`,
          type: data.type,
          url: data.url,
          syncStatus: 'IDLE',
          lastSyncedAt: null,
          lastError: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
    },
    __createCalls: createCalls,
  };
};

test('FeedSource bootstrap and seed behavior', async (t) => {
  await t.test('should create all predefined feed sources when the database is empty', async () => {
    const prisma = createMockPrisma();

    await bootstrapFeedSources(prisma);

    assert.equal(prisma.__createCalls.length, predefinedFeedSources.length);
    assert.equal(prisma.__createCalls[0].url, predefinedFeedSources[0].url);
  });

  await t.test('should skip existing feed sources and only create missing ones', async () => {
    const existing = [
      { url: predefinedFeedSources[0].url, type: 'RSS' },
    ];
    const createCalls = [...existing];
    const prisma = {
      feedSource: {
        findUnique: async ({ where }) => createCalls.find((item) => item.url === where.url) ?? null,
        create: async ({ data }) => {
          createCalls.push(data);
          return data;
        },
      },
    };

    await bootstrapFeedSources(prisma);

    assert.equal(createCalls.length, predefinedFeedSources.length);
  });

  await t.test('should be idempotent across repeated executions', async () => {
    const createCalls = [];
    const prisma = {
      feedSource: {
        findUnique: async ({ where }) => createCalls.find((item) => item.url === where.url) ?? null,
        create: async ({ data }) => {
          createCalls.push(data);
          return data;
        },
      },
    };

    await bootstrapFeedSources(prisma);
    await bootstrapFeedSources(prisma);

    assert.equal(createCalls.length, predefinedFeedSources.length);
  });

  await t.test('should prevent duplicates when feed configuration contains repeated URLs', async () => {
    const duplicateConfig = [
      { url: predefinedFeedSources[0].url, type: 'RSS' },
      { url: predefinedFeedSources[0].url, type: 'RSS' },
    ];
    const createCalls = [];
    const prisma = {
      feedSource: {
        findUnique: async ({ where }) => createCalls.find((item) => item.url === where.url) ?? null,
        create: async ({ data }) => {
          createCalls.push(data);
          return data;
        },
      },
    };

    await bootstrapFeedSources(prisma, duplicateConfig);

    assert.equal(createCalls.length, 1);
  });

  await t.test('should parse RSS feed URLs from a text file while ignoring comments and blank lines', async () => {
    const tempDir = mkdtempSync(join(tmpdir(), 'castaminofen-rss-'));
    const feedFilePath = join(tempDir, 'rss-feeds.txt');

    writeFileSync(feedFilePath, '# comment\n\nhttps://example.com/feed.xml\n  https://example.org/another.xml  \n');

    try {
      assert.deepEqual(readRssFeedUrlsFromFile(feedFilePath), ['https://example.com/feed.xml', 'https://example.org/another.xml']);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  await t.test('FeedSourceSeederService calls bootstrap helper during application startup', async () => {
    let bootstrapInvoked = false;
    const mockPrisma = {
      feedSource: {
        findUnique: async () => null,
        create: async () => {
          bootstrapInvoked = true;
          return null;
        },
      },
    };

    const service = new FeedSourceSeederService(mockPrisma);
    await service.onApplicationBootstrap();

    assert.equal(bootstrapInvoked, true);
  });
});
