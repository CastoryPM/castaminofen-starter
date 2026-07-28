import { describe, expect, it } from 'vitest';
import type { Episode, Podcast } from '@/lib/types';
import { canPlayEpisode, formatDisplayDate, getPodcastOwnerLabel } from './podcastPresentation';

describe('podcast presentation helpers', () => {
  it('uses the owner name when available and falls back to the podcast title', () => {
    const podcast = {
      title: 'RSS Imported Podcast',
      owner: { id: 'owner-1', name: 'Account Name' },
    } as Podcast;

    expect(getPodcastOwnerLabel(podcast)).toBe('Account Name');

    const fallbackPodcast = {
      title: 'Fallback Podcast',
      owner: undefined,
    } as Podcast;

    expect(getPodcastOwnerLabel(fallbackPodcast)).toBe('Fallback Podcast');
  });

  it('formats episode dates for the discovery experience', () => {
    expect(formatDisplayDate('2026-07-20T10:30:00.000Z')).toBe('۱۴۰۵/۴/۲۹');
    expect(formatDisplayDate(undefined)).toBe('—');
  });

  it('allows playback only for episodes with audio available', () => {
    const playableEpisode = { audioUrl: 'https://example.com/audio.mp3' } as Episode;
    const missingAudioEpisode = { audioUrl: undefined } as Episode;

    expect(canPlayEpisode(playableEpisode)).toBe(true);
    expect(canPlayEpisode(missingAudioEpisode)).toBe(false);
  });
});
