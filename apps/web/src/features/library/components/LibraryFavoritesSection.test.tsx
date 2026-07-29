import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../hooks/useFavorites', () => ({
  useFavorites: vi.fn(),
  useSaveFavorite: vi.fn(),
  useRemoveFavorite: vi.fn(),
}));

vi.mock('@/features/player/hooks/usePlayerRuntime', () => ({
  usePlayerRuntime: vi.fn(),
}));

const { useFavorites, useSaveFavorite, useRemoveFavorite } = await vi.importMock('../hooks/useFavorites');
const { usePlayerRuntime } = await vi.importMock('@/features/player/hooks/usePlayerRuntime');
const { LibraryFavoritesSection } = await import('./LibraryFavoritesSection');

describe('LibraryFavoritesSection', () => {
  it('renders loading skeleton when favorites are loading', () => {
    useFavorites.mockReturnValue({ isLoading: true });
    usePlayerRuntime.mockReturnValue({ loadItem: async () => {} });
    // Provide mutation mocks for nested FavoriteActionButton
    useSaveFavorite.mockReturnValue({ mutateAsync: vi.fn(), isPending: false, error: null });
    useRemoveFavorite.mockReturnValue({ mutateAsync: vi.fn(), isPending: false, error: null });

    const html = renderToStaticMarkup(<LibraryFavoritesSection />);

    expect(html).toContain('animate-pulse');
  });

  it('renders error state when favorites query fails', () => {
    useFavorites.mockReturnValue({ isLoading: false, isError: true, refetch: vi.fn() });
    usePlayerRuntime.mockReturnValue({ loadItem: async () => {} });
    useSaveFavorite.mockReturnValue({ mutateAsync: vi.fn(), isPending: false, error: null });
    useRemoveFavorite.mockReturnValue({ mutateAsync: vi.fn(), isPending: false, error: null });

    const html = renderToStaticMarkup(<LibraryFavoritesSection />);

    expect(html).toContain('خطا در بارگذاری علاقه‌مندی‌ها');
    expect(html).toContain('تلاش مجدد');
  });

  it('renders empty state when there are no saved favorites', () => {
    useFavorites.mockReturnValue({ isLoading: false, isError: false, data: [] });
    usePlayerRuntime.mockReturnValue({ loadItem: async () => {} });
    useSaveFavorite.mockReturnValue({ mutateAsync: vi.fn(), isPending: false, error: null });
    useRemoveFavorite.mockReturnValue({ mutateAsync: vi.fn(), isPending: false, error: null });

    const html = renderToStaticMarkup(<LibraryFavoritesSection />);

    expect(html).toContain('علاقه‌مندی‌های شما در انتظارند');
    expect(html).toContain('کاوش در پادکست‌ها');
  });

  it('renders favorites with play and remove actions', () => {
    useFavorites.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 'fav-1',
          userId: 'user-1',
          episodeId: 'ep-1',
          savedAt: new Date().toISOString(),
          episode: {
            id: 'ep-1',
            title: 'Episode One',
            description: 'Description',
            audioUrl: 'https://example.com/audio.mp3',
            podcastId: 'pod-1',
            podcast: { id: 'pod-1', title: 'Podcast Title', artworkUrl: null },
          },
        },
      ],
    });
    usePlayerRuntime.mockReturnValue({ loadItem: async () => {} });
    useSaveFavorite.mockReturnValue({ mutateAsync: vi.fn(), isPending: false, error: null });
    useRemoveFavorite.mockReturnValue({ mutateAsync: vi.fn(), isPending: false, error: null });

    const html = renderToStaticMarkup(<LibraryFavoritesSection />);

    expect(html).toContain('Episode One');
    expect(html).toContain('Podcast Title');
    expect(html).toContain('aria-label="Play Episode One"');
  });
});
