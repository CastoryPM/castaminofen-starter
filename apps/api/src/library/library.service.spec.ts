import test from 'node:test';
import assert from 'node:assert/strict';
import { Prisma } from '@prisma/client';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { LibraryService } from './library.service';

function createMockPrisma(overrides: Partial<Record<string, any>> = {}) {
  return {
    episode: {
      findUnique: async (args: any) => overrides.episode?.findUnique?.(args) ?? null,
    },
    favoriteEpisode: {
      findMany: async (args: any) => overrides.favoriteEpisode?.findMany?.(args) ?? [],
      create: async (args: any) => overrides.favoriteEpisode?.create?.(args),
      findUnique: async (args: any) => overrides.favoriteEpisode?.findUnique?.(args) ?? null,
      delete: async (args: any) => overrides.favoriteEpisode?.delete?.(args),
    },
  };
}

const createService = (prisma: any) => new LibraryService(prisma, {} as any);

test('LibraryService.getFavorites returns user saved episodes', async () => {
  const expected = [{ id: 'fav-1', userId: 'user-1', episodeId: 'ep-1', savedAt: new Date().toISOString() }];
  const prisma = createMockPrisma({
    favoriteEpisode: {
      findMany: async () => expected,
    },
  });

  const service = createService(prisma);
  const result = await service.getFavorites('user-1');

  assert.equal(result, expected);
});

test('LibraryService.saveFavorite creates relation for existing episode', async () => {
  const saved = { id: 'fav-1', userId: 'user-1', episodeId: 'ep-1', savedAt: new Date().toISOString(), episode: { id: 'ep-1' } };
  const prisma = createMockPrisma({
    episode: {
      findUnique: async () => ({ id: 'ep-1' }),
    },
    favoriteEpisode: {
      create: async () => saved,
    },
  });

  const service = createService(prisma);
  const result = await service.saveFavorite('user-1', { episodeId: 'ep-1' });

  assert.equal(result, saved);
});

test('LibraryService.saveFavorite throws ConflictException when episode is already saved', async () => {
  const prisma = createMockPrisma({
    episode: {
      findUnique: async () => ({ id: 'ep-1' }),
    },
    favoriteEpisode: {
      create: async () => {
        throw Object.assign(new Error('Unique constraint failed'), { code: 'P2002' });
      },
    },
  });

  const service = createService(prisma);

  await assert.rejects(
    () => service.saveFavorite('user-1', { episodeId: 'ep-1' }),
    ConflictException,
  );
});

test('LibraryService.removeFavorite deletes the saved relation', async () => {
  const deleted = { id: 'fav-1', userId: 'user-1', episodeId: 'ep-1' };
  const prisma = createMockPrisma({
    favoriteEpisode: {
      findUnique: async () => ({ id: 'fav-1' }),
      delete: async () => deleted,
    },
  });

  const service = createService(prisma);
  const result = await service.removeFavorite('user-1', 'ep-1');

  assert.equal(result, deleted);
});

test('LibraryService.removeFavorite throws NotFoundException when favorite does not exist', async () => {
  const prisma = createMockPrisma({
    favoriteEpisode: {
      findUnique: async () => null,
    },
  });

  const service = createService(prisma);

  await assert.rejects(
    () => service.removeFavorite('user-1', 'ep-1'),
    NotFoundException,
  );
});
