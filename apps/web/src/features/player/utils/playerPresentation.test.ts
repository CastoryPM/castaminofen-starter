import { describe, expect, it } from 'vitest';
import { formatTime, getPlaybackStateLabel, getQueueSummary, getQueueDisplayItems } from './playerPresentation';

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

  it('builds a current-item and up-next view from the existing queue order', () => {
    const queue = [
      { id: 'a', title: 'First', subtitle: 'Podcast A', sourceType: 'episode' as const },
      { id: 'b', title: 'Second', subtitle: 'Podcast B', sourceType: 'episode' as const },
      { id: 'c', title: 'Third', subtitle: 'Podcast C', sourceType: 'episode' as const },
    ];

    const displayItems = getQueueDisplayItems(queue, 0);

    expect(displayItems.currentItem?.id).toBe('a');
    expect(displayItems.upNext.map((item) => item.id)).toEqual(['b', 'c']);
    expect(displayItems.upNext[0].position).toBe(2);
    expect(displayItems.upNext[1].position).toBe(3);
  });
});
