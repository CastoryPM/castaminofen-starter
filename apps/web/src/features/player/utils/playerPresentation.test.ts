import { describe, expect, it } from 'vitest';
import { formatTime, getPlaybackStateLabel, getQueueSummary } from './playerPresentation';

describe('player presentation helpers', () => {
  it('formats durations consistently', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(125)).toBe('02:05');
  });

  it('returns a calm status label for loading and error states', () => {
    expect(getPlaybackStateLabel('loading')).toBe('در حال آماده‌سازی پخش');
    expect(getPlaybackStateLabel('paused')).toBe('متوقف');
    expect(getPlaybackStateLabel('playing')).toBe('در حال پخش');
    expect(getPlaybackStateLabel('idle')).toBe('آماده');
  });

  it('summarizes queue context without changing queue logic', () => {
    expect(getQueueSummary({ queueLength: 3, currentIndex: 1, repeatMode: 'off', shuffleEnabled: false })).toBe('1 مورد دیگر در صف');
    expect(getQueueSummary({ queueLength: 1, currentIndex: 0, repeatMode: 'queue', shuffleEnabled: false })).toBe('تکرار صف فعال است');
    expect(getQueueSummary({ queueLength: 4, currentIndex: 3, repeatMode: 'one', shuffleEnabled: true })).toBe('آخرین مورد در صف و تکرار یک مورد و تصادفی');
  });
});
