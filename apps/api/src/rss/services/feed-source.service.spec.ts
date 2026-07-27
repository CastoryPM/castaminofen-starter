const assert = require('node:assert/strict');
const test = require('node:test');
const { FeedSourceService } = require('../services/feed-source.service');
const { NotFoundException, ConflictException } = require('@nestjs/common');

test('FeedSourceService', async (t) => {
  const createMockPrisma = () => ({
    feedSource: {
      create: async (args) => ({
        id: 'feed-1',
        type: args.data.type || 'RSS',
        url: args.data.url,
        syncStatus: 'IDLE',
        lastSyncedAt: null,
        lastError: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findUnique: async (args) => {
        if (args.where.url === 'https://example.com/feed.xml') {
          return {
            id: 'feed-1',
            type: 'RSS',
            url: 'https://example.com/feed.xml',
            syncStatus: 'IDLE',
            lastSyncedAt: null,
            lastError: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
        if (args.where.url === 'https://example.com/duplicate.xml') {
          return {
            id: 'feed-2',
            type: 'RSS',
            url: 'https://example.com/duplicate.xml',
            syncStatus: 'IDLE',
            lastSyncedAt: null,
            lastError: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
        if (args.where.id === 'feed-1') {
          return {
            id: 'feed-1',
            type: 'RSS',
            url: 'https://example.com/feed.xml',
            syncStatus: 'IDLE',
            lastSyncedAt: null,
            lastError: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
        if (args.where.id === 'not-found') {
          return null;
        }
        return null;
      },
      findMany: async () => [
        {
          id: 'feed-1',
          type: 'RSS',
          url: 'https://example.com/feed1.xml',
          syncStatus: 'IDLE',
          lastSyncedAt: null,
          lastError: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'feed-2',
          type: 'RSS',
          url: 'https://example.com/feed2.xml',
          syncStatus: 'SUCCESS',
          lastSyncedAt: new Date(),
          lastError: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      update: async (args) => ({
        id: args.where.id,
        type: 'RSS',
        url: args.data.url || 'https://example.com/feed.xml',
        syncStatus: 'IDLE',
        lastSyncedAt: null,
        lastError: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      delete: async (args) => ({
        id: args.where.id,
      }),
    },
    podcast: {
      findFirst: async (args) => {
        if (args.where.feedSourceId === 'feed-with-podcast') {
          return {
            id: 'podcast-1',
            title: 'Example Podcast',
            feedSourceId: 'feed-with-podcast',
          };
        }
        return null;
      },
    },
  });

  await t.test('create', async (t) => {
    await t.test('should create a FeedSource with valid URL', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      const result = await service.create({
        url: 'https://example.com/new-feed.xml',
        type: 'RSS',
      });

      assert.equal(result.url, 'https://example.com/new-feed.xml');
      assert.equal(result.type, 'RSS');
      assert.equal(result.syncStatus, 'IDLE');
    });

    await t.test('should throw ConflictException when URL already exists', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      try {
        await service.create({
          url: 'https://example.com/feed.xml',
        });
        assert.fail('Expected ConflictException');
      } catch (error) {
        assert(error instanceof ConflictException);
        assert(error.message.includes('already exists'));
      }
    });

    await t.test('should default to RSS type when not specified', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      const result = await service.create({
        url: 'https://example.com/another-feed.xml',
      });

      assert.equal(result.type, 'RSS');
    });
  });

  await t.test('findAll', async (t) => {
    await t.test('should return all FeedSources', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      const result = await service.findAll();

      assert.equal(result.length, 2);
      assert.equal(result[0].id, 'feed-1');
      assert.equal(result[1].id, 'feed-2');
    });
  });

  await t.test('findById', async (t) => {
    await t.test('should return a FeedSource by ID', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      const result = await service.findById('feed-1');

      assert.equal(result.id, 'feed-1');
      assert.equal(result.url, 'https://example.com/feed.xml');
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      try {
        await service.findById('not-found');
        assert.fail('Expected NotFoundException');
      } catch (error) {
        assert(error instanceof NotFoundException);
        assert(error.message.includes('not found'));
      }
    });
  });

  await t.test('update', async (t) => {
    await t.test('should update URL for a FeedSource', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      const result = await service.update('feed-1', {
        url: 'https://example.com/updated-feed.xml',
      });

      assert.equal(result.id, 'feed-1');
      assert.equal(result.url, 'https://example.com/updated-feed.xml');
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      try {
        await service.update('not-found', { url: 'https://example.com/new.xml' });
        assert.fail('Expected NotFoundException');
      } catch (error) {
        assert(error instanceof NotFoundException);
      }
    });

    await t.test('should throw ConflictException when new URL already exists', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      try {
        await service.update('feed-1', { url: 'https://example.com/duplicate.xml' });
        assert.fail('Expected ConflictException');
      } catch (error) {
        assert(error instanceof ConflictException);
        assert(error.message.includes('already exists'));
      }
    });
  });

  await t.test('delete', async (t) => {
    await t.test('should delete a FeedSource that has no associated Podcast', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      // Should not throw
      await service.delete('feed-1');
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const prisma = createMockPrisma();
      const service = new FeedSourceService(prisma);

      try {
        await service.delete('not-found');
        assert.fail('Expected NotFoundException');
      } catch (error) {
        assert(error instanceof NotFoundException);
      }
    });

    await t.test('should throw ConflictException when FeedSource is associated with a Podcast', async () => {
      const prisma = createMockPrisma();
      prisma.feedSource.findUnique = async (args) => {
        if (args.where.id === 'feed-with-podcast') {
          return {
            id: 'feed-with-podcast',
            type: 'RSS',
            url: 'https://example.com/feed.xml',
            syncStatus: 'IDLE',
            lastSyncedAt: null,
            lastError: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
        return null;
      };
      const service = new FeedSourceService(prisma);

      try {
        await service.delete('feed-with-podcast');
        assert.fail('Expected ConflictException');
      } catch (error) {
        assert(error instanceof ConflictException);
        assert(error.message.includes('associated with Podcast'));
      }
    });
  });
});
