import { describe, expect, it } from 'vitest';
import type { Episode, Podcast } from '@/lib/types';
import { rankPodcastResults, rankEpisodeResults } from './searchRanking';

const buildPodcast = (overrides: Partial<Podcast> = {}): Podcast => ({
  id: overrides.id ?? 'podcast-1',
  title: overrides.title ?? 'Designing Better Products',
  rssUrl: overrides.rssUrl ?? 'https://example.com/feed.xml',
  description: overrides.description ?? 'A thoughtful podcast about digital product design.',
  owner: overrides.owner ?? { id: 'owner-1', name: 'Ada Lovelace' },
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
});

const buildEpisode = (overrides: Partial<Episode> = {}): Episode => ({
  id: overrides.id ?? 'episode-1',
  podcastId: overrides.podcastId ?? 'podcast-1',
  title: overrides.title ?? 'How to ship better products',
  description: overrides.description ?? 'A practical discussion about product delivery.',
  audioUrl: overrides.audioUrl ?? 'https://example.com/audio.mp3',
  publishedAt: overrides.publishedAt ?? '2024-01-10T00:00:00.000Z',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  podcast: overrides.podcast ?? { title: 'Designing Better Products', artworkUrl: null },
});

describe('searchRanking', () => {
  it('prioritizes exact title matches before creator or description matches', () => {
    const podcasts = [
      buildPodcast({ id: 'pod-1', title: 'The Product Design Podcast', description: 'A show about design systems.' }),
      buildPodcast({ id: 'pod-2', title: 'Designing Better Products', description: 'A show about design systems.' }),
      buildPodcast({ id: 'pod-3', title: 'Product Strategy Lab', owner: { id: 'owner-2', name: 'Designing Better Products' } }),
    ];

    const ranked = rankPodcastResults(podcasts, 'designing better products');

    expect(ranked.map((podcast) => podcast.id)).toEqual(['pod-2', 'pod-3', 'pod-1']);
  });

  it('prioritizes title matches before description matches for episodes', () => {
    const episodes = [
      buildEpisode({ id: 'ep-1', title: 'A general episode', description: 'This episode mentions shipping better products.' }),
      buildEpisode({ id: 'ep-2', title: 'Shipping Better Products', description: 'A practical guide to shipping.' }),
      buildEpisode({ id: 'ep-3', title: 'Product Notes', description: 'A deep dive into shipping better products.' }),
    ];

    const ranked = rankEpisodeResults(episodes, 'shipping better products');

    expect(ranked.map((episode) => episode.id)).toEqual(['ep-2', 'ep-1', 'ep-3']);
  });
});
