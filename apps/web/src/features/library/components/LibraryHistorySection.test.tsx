import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock player/runtime hooks and update hook to avoid creating browser audio engine
vi.mock('@/features/player/hooks/usePlayerRuntime', () => ({
  usePlayerRuntime: () => ({ loadItem: async () => {} }),
}));

vi.mock('@/features/player/hooks/usePlayerState', () => ({
  usePlayerState: () => ({ currentItem: null }),
}));

vi.mock('@/features/library/hooks/useUpdateListeningHistory', () => ({
  useUpdateListeningHistory: () => ({ mutate: () => {} }),
}));

import { LibraryHistorySection } from './LibraryHistorySection';

describe('LibraryHistorySection', () => {
  it('renders a history item with episode and podcast metadata', () => {
    const now = new Date();
    const item = {
      id: 'h1',
      userId: 'u1',
      episodeId: 'e1',
      positionSeconds: 30,
      completed: false,
      lastPlayedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      episode: {
        id: 'e1',
        title: 'Episode One',
        description: 'An episode description',
        audioUrl: 'https://example.com/audio.mp3',
        podcastId: 'p1',
        podcast: { id: 'p1', title: 'Podcast Title', artworkUrl: null },
      },
    } as any;

    const html = renderToStaticMarkup(<LibraryHistorySection items={[item]} />);

    expect(html).toContain('Episode One');
    expect(html).toContain('Podcast Title');
    expect(html).toContain('Listening History');
    // Ensure a play/resume action exists
    expect(html).toMatch(/ادامه|ادامه پخش|آماده برای ادامه/);
  });

  it('renders the empty state when no items are provided', () => {
    const html = renderToStaticMarkup(<LibraryHistorySection items={[]} />);
    expect(html).toContain('تاریخچه گوش دادن');
    expect(html).toContain('هنوز تاریخچه‌ای برای پخش وجود ندارد');
  });
});
