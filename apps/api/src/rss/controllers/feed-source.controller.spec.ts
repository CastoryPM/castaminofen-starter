const assert = require('node:assert/strict');
const test = require('node:test');
const { FeedSourceController } = require('./feed-source.controller');
const { NotFoundException, ConflictException, InternalServerErrorException } = require('@nestjs/common');

test('FeedSourceController', async (t) => {
  const createMockService = () => ({
    findAll: async () => [
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
    findById: async (id) => {
      if (id === 'not-found') {
        throw new NotFoundException(`FeedSource with ID "${id}" not found`);
      }
      if (id === 'error') {
        throw new Error('Unexpected error');
      }
      return {
        id,
        type: 'RSS',
        url: 'https://example.com/feed.xml',
        syncStatus: 'IDLE',
        lastSyncedAt: null,
        lastError: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
    create: async (dto) => {
      if (dto.url === 'https://example.com/duplicate.xml') {
        throw new ConflictException(`FeedSource with URL "${dto.url}" already exists`);
      }
      return {
        id: 'new-feed',
        type: dto.type || 'RSS',
        url: dto.url,
        syncStatus: 'IDLE',
        lastSyncedAt: null,
        lastError: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
    update: async (id, dto) => {
      if (id === 'not-found') {
        throw new NotFoundException(`FeedSource with ID "${id}" not found`);
      }
      if (dto.url === 'https://example.com/duplicate.xml') {
        throw new ConflictException(`FeedSource with URL "${dto.url}" already exists`);
      }
      return {
        id,
        type: 'RSS',
        url: dto.url || 'https://example.com/feed.xml',
        syncStatus: 'IDLE',
        lastSyncedAt: null,
        lastError: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
    delete: async (id) => {
      if (id === 'not-found') {
        throw new NotFoundException(`FeedSource with ID "${id}" not found`);
      }
      if (id === 'in-use') {
        throw new ConflictException('Cannot delete FeedSource because it is associated with Podcast');
      }
    },
  });

  await t.test('findAll', async (t) => {
    await t.test('should return all FeedSources', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      const result = await controller.findAll();

      assert.equal(result.length, 2);
      assert.equal(result[0].id, 'feed-1');
      assert.equal(result[1].id, 'feed-2');
    });
  });

  await t.test('findById', async (t) => {
    await t.test('should return a FeedSource by ID', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      const result = await controller.findById('feed-1');

      assert.equal(result.id, 'feed-1');
      assert.equal(result.url, 'https://example.com/feed.xml');
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      try {
        await controller.findById('not-found');
        assert.fail('Expected NotFoundException');
      } catch (error) {
        assert(error instanceof NotFoundException);
      }
    });

    await t.test('should throw InternalServerErrorException on unexpected error', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      try {
        await controller.findById('error');
        assert.fail('Expected InternalServerErrorException');
      } catch (error) {
        assert(error instanceof InternalServerErrorException);
      }
    });
  });

  await t.test('create', async (t) => {
    await t.test('should create a new FeedSource', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      const result = await controller.create({
        url: 'https://example.com/new-feed.xml',
        type: 'RSS',
      });

      assert.equal(result.id, 'new-feed');
      assert.equal(result.url, 'https://example.com/new-feed.xml');
      assert.equal(result.type, 'RSS');
    });

    await t.test('should throw ConflictException when URL already exists', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      try {
        await controller.create({
          url: 'https://example.com/duplicate.xml',
        });
        assert.fail('Expected ConflictException');
      } catch (error) {
        assert(error instanceof ConflictException);
      }
    });
  });

  await t.test('update', async (t) => {
    await t.test('should update a FeedSource URL', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      const result = await controller.update('feed-1', {
        url: 'https://example.com/updated-feed.xml',
      });

      assert.equal(result.id, 'feed-1');
      assert.equal(result.url, 'https://example.com/updated-feed.xml');
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      try {
        await controller.update('not-found', { url: 'https://example.com/new.xml' });
        assert.fail('Expected NotFoundException');
      } catch (error) {
        assert(error instanceof NotFoundException);
      }
    });

    await t.test('should throw ConflictException when new URL already exists', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      try {
        await controller.update('feed-1', { url: 'https://example.com/duplicate.xml' });
        assert.fail('Expected ConflictException');
      } catch (error) {
        assert(error instanceof ConflictException);
      }
    });
  });

  await t.test('delete', async (t) => {
    await t.test('should delete a FeedSource', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      // Should not throw
      await controller.delete('feed-1');
    });

    await t.test('should throw NotFoundException when FeedSource does not exist', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      try {
        await controller.delete('not-found');
        assert.fail('Expected NotFoundException');
      } catch (error) {
        assert(error instanceof NotFoundException);
      }
    });

    await t.test('should throw ConflictException when FeedSource is in use', async () => {
      const service = createMockService();
      const controller = new FeedSourceController(service);

      try {
        await controller.delete('in-use');
        assert.fail('Expected ConflictException');
      } catch (error) {
        assert(error instanceof ConflictException);
      }
    });
  });
});
