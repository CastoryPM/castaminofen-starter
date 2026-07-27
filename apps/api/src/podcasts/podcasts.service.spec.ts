import test from 'node:test';
import assert from 'node:assert/strict';
import { NotFoundException } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

function createPrismaStub(podcastResult: any, episodesResult: any[] = []) {
  const calls: Array<{ type: string; args: any }> = [];

  const prisma = {
    podcast: {
      findUnique: async (args: any) => {
        calls.push({ type: 'podcast.findUnique', args });
        return podcastResult;
      },
    },
    episode: {
      findMany: async (args: any) => {
        calls.push({ type: 'episode.findMany', args });
        return episodesResult;
      },
    },
  };

  return { prisma, calls };
}

test('PodcastsService.findById returns public podcast details and related episodes', async () => {
  const podcast = {
    id: 'pod-1',
    title: 'Example Podcast',
    description: 'A public podcast description',
    website: 'https://example.com',
    artworkUrl: 'https://example.com/artwork.jpg',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-02T00:00:00.000Z'),
  };

  const episode = {
    id: 'ep-1',
    title: 'Example Episode',
    description: 'Episode description',
    audioUrl: 'https://example.com/episode.mp3',
    duration: 1800,
    publishedAt: new Date('2024-01-02T00:00:00.000Z'),
    createdAt: new Date('2024-01-02T00:00:00.000Z'),
    updatedAt: new Date('2024-01-02T00:00:00.000Z'),
  };

  const { prisma, calls } = createPrismaStub({ ...podcast, episodes: [episode] }, [episode]);
  const service = new PodcastsService(prisma as any);

  const result = await service.findById('pod-1');

  assert.equal(result.id, 'pod-1');
  assert.equal(result.title, 'Example Podcast');
  assert.equal(result.description, 'A public podcast description');
  assert.equal(result.website, 'https://example.com');
  assert.equal(result.artworkUrl, 'https://example.com/artwork.jpg');
  assert.equal(result.episodes[0].title, 'Example Episode');
  assert.equal(result.episodes[0].audioUrl, 'https://example.com/episode.mp3');
  assert.equal('rssUrl' in result, false);
  assert.equal('feedSourceId' in result, false);
  assert.equal('syncStatus' in result, false);
  assert.equal('lastSyncedAt' in result, false);
  assert.equal('lastError' in result, false);
  assert.equal('guid' in result.episodes[0], false);
  assert.deepEqual(calls[0].args.where, { id: 'pod-1' });
  assert.equal(calls[0].args.select.episodes.select.duration, true);
  assert.equal(calls[0].args.select.rssUrl, undefined);
});

test('PodcastsService.findById throws NotFoundException for missing podcasts', async () => {
  const { prisma } = createPrismaStub(null);
  const service = new PodcastsService(prisma as any);

  await assert.rejects(() => service.findById('missing-podcast'), NotFoundException);
});

test('PodcastsService.findEpisodesByPodcastId scopes episodes to the requested podcast', async () => {
  const { prisma, calls } = createPrismaStub({ id: 'pod-1' }, [
    { id: 'ep-1', podcastId: 'pod-1', title: 'Episode 1' },
  ]);
  const service = new PodcastsService(prisma as any);

  const result = await service.findEpisodesByPodcastId('pod-1');

  assert.equal(result.length, 1);
  assert.equal(result[0].podcastId, 'pod-1');
  assert.deepEqual(calls[1].args.where, { podcastId: 'pod-1' });
  assert.equal(calls[1].args.select.title, true);
  assert.equal(calls[1].args.select.guid, undefined);
});
