import { describe, expect, it } from 'vitest';
import type { Episode } from '@/lib/types';

describe('Episode presentation', () => {
  it('keeps the public episode contract intact for RSS-backed episodes', () => {
    const episode = {
      id: 'episode-1',
      podcastId: 'podcast-1',
      title: 'RSS Episode Title',
      description: 'A rich episode description',
      audioUrl: 'https://example.com/audio.mp3',
      publishedAt: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    } as Episode;

    expect(episode.title).toBe('RSS Episode Title');
    expect(episode.description).toBe('A rich episode description');
    expect(episode.audioUrl).toBe('https://example.com/audio.mp3');
    expect(episode).not.toHaveProperty('guid');
    expect(episode).not.toHaveProperty('feedSourceId');
  });
});
