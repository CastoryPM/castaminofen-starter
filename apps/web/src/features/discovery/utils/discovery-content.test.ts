import { describe, expect, it } from 'vitest';
import type { Episode, Podcast } from '@/lib/types';
import { buildDiscoverySections } from './discovery-content';

const podcastFixture: Podcast = {
  id: 'pod-1',
  title: 'Deep Focus',
  rssUrl: 'https://example.com/feed.xml',
  description: 'A calm audio experience for thoughtful listeners.',
  artworkUrl: 'https://example.com/artwork.jpg',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const episodeFixture: Episode = {
  id: 'ep-1',
  podcastId: 'pod-1',
  title: 'The Quiet Start',
  description: 'A fresh release for the discovery experience.',
  createdAt: '2024-01-02T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
};

describe('buildDiscoverySections', () => {
  it('creates an editorial structure with curated placeholders for unsupported recommendations', () => {
    const sections = buildDiscoverySections({
      podcasts: [podcastFixture],
      episodes: [episodeFixture],
      continueListeningCount: 0,
      isAuthenticated: false,
    });

    expect(sections[0]).toMatchObject({ title: 'Featured Podcasts', mode: 'podcasts' });
    expect(sections[1]).toMatchObject({ title: 'Trending Now', mode: 'podcasts' });
    expect(sections[2]).toMatchObject({ title: 'Continue Listening', mode: 'placeholder' });
    expect(sections[3]).toMatchObject({ title: 'Recommended For You', mode: 'placeholder' });
    expect(sections[4]).toMatchObject({ title: 'Browse Categories', mode: 'categories' });
    expect(sections[5]).toMatchObject({ title: 'New Releases', mode: 'episodes' });
  });

  it('uses the continue-listening mode when listening history exists', () => {
    const sections = buildDiscoverySections({
      podcasts: [podcastFixture],
      episodes: [episodeFixture],
      continueListeningCount: 1,
      isAuthenticated: true,
    });

    expect(sections[2]).toMatchObject({ title: 'Continue Listening', mode: 'continue-listening' });
  });
});
