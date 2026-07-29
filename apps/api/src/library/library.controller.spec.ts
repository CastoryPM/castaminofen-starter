import 'reflect-metadata';
import assert from 'node:assert/strict';
import test from 'node:test';
import { PATH_METADATA } from '@nestjs/common/constants';
import { LibraryController } from './library.controller';

test('LibraryController exposes the library route under the global API prefix', () => {
  const path = Reflect.getMetadata(PATH_METADATA, LibraryController);
  assert.equal(path, 'library');
});

test('LibraryController favorites endpoints call LibraryService with the authenticated user', async () => {
  const service = {
    getFavorites: async (userId: string) => ({ userId, items: [] }),
    saveFavorite: async (userId: string, dto: any) => ({ userId, ...dto }),
    removeFavorite: async (userId: string, episodeId: string) => ({ userId, episodeId }),
  };

  const controller = new LibraryController(service as any);

  const favorites = await controller.getFavorites('user-1');
  assert.deepEqual(favorites, { userId: 'user-1', items: [] });

  const saved = await controller.saveFavorite('user-1', { episodeId: 'ep-1' });
  assert.deepEqual(saved, { userId: 'user-1', episodeId: 'ep-1' });

  const removed = await controller.removeFavorite('user-1', 'ep-1');
  assert.deepEqual(removed, { userId: 'user-1', episodeId: 'ep-1' });
});
