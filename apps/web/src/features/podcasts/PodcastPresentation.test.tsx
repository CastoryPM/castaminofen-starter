import { describe, expect, it } from 'vitest';
import type { Podcast } from '@/lib/types';

describe('Podcast presentation', () => {
  it('keeps the public podcast contract intact for RSS-backed content', () => {
    const podcast = {
      id: 'podcast-1',
      title: 'RSS Imported Podcast',
      description: 'A polished podcast description',
      artworkUrl: 'https://example.com/artwork.png',
      rssUrl: 'https://example.com/feed.xml',
      website: 'https://example.com',
      ownerId: 'owner-1',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    } as Podcast;

    expect(podcast.title).toBe('RSS Imported Podcast');
    expect(podcast.description).toBe('A polished podcast description');
    expect(podcast.artworkUrl).toBe('https://example.com/artwork.png');
    expect(podcast).not.toHaveProperty('feedSourceId');
    expect(podcast).not.toHaveProperty('syncStatus');
    expect(podcast).not.toHaveProperty('lastSyncedAt');
  });

  it('preserves the podcast detail contract without RSS operational fields', () => {
    const podcast = {
      id: 'podcast-2',
      title: 'Imported Podcast',
      description: 'A regular podcast description',
      website: 'https://example.com',
      rssUrl: 'https://example.com/feed.xml',
      ownerId: 'owner-2',
      episodes: [
        {
          id: 'episode-1',
          podcastId: 'podcast-2',
          title: 'Episode One',
          description: 'Episode description',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ],
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    } as Podcast;

    expect(podcast.title).toBe('Imported Podcast');
    expect(podcast.description).toBe('A regular podcast description');
    expect(podcast.episodes?.[0]?.title).toBe('Episode One');
    expect(podcast).not.toHaveProperty('feedSourceId');
    expect(podcast).not.toHaveProperty('syncStatus');
    expect(podcast).not.toHaveProperty('lastSyncedAt');
  });
});
