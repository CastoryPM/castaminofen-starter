import { describe, expect, it } from 'vitest';
import type { Episode, Podcast } from '@/lib/types';
import { buildPodcastMetadataItems, canPlayEpisode, formatDisplayDate, getContinueListeningSummary, getPodcastOwnerLabel } from './podcastPresentation';

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

  it('builds metadata items from the fields that are actually available', () => {
    const podcast = {
      title: 'RSS Imported Podcast',
      owner: { id: 'owner-1', name: 'Account Name' },
      updatedAt: '2026-07-20T10:30:00.000Z',
      episodes: [{ id: 'episode-1' }, { id: 'episode-2' }],
      website: 'https://example.com',
    } as Podcast;

    expect(buildPodcastMetadataItems(podcast)).toEqual([
      { label: 'ناشر', value: 'Account Name' },
      { label: 'اپیزودها', value: '۲ اپیزود' },
      { label: 'آخرین به‌روزرسانی', value: '۱۴۰۵/۴/۲۹' },
      { label: 'وب‌سایت', value: 'https://example.com' },
    ]);
  });

  it('creates a safe continue-listening summary without inventing progress', () => {
    expect(getContinueListeningSummary({ positionSeconds: 180, durationSeconds: 600 })).toEqual({
      label: 'ادامه پخش',
      progress: '۳۰%',
      detail: '۷ دقیقه مانده',
    });

    expect(getContinueListeningSummary({ positionSeconds: 90 })).toEqual({
      label: 'ادامه پخش',
      progress: null,
      detail: '۱:۳۰',
    });

    expect(getContinueListeningSummary()).toBeNull();
  });
});
