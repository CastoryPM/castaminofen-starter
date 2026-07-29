import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../hooks/useFavorites', () => ({
  useFavorites: vi.fn(),
  useSaveFavorite: vi.fn(),
  useRemoveFavorite: vi.fn(),
}));

const { useFavorites, useSaveFavorite, useRemoveFavorite } = await vi.importMock('../hooks/useFavorites');
const { FavoriteActionButton } = await import('./FavoriteActionButton');

const createSaveMock = (overrides: any = {}) => ({
  mutateAsync: vi.fn().mockResolvedValue(undefined),
  isPending: false,
  error: null,
  ...overrides,
});

const createRemoveMock = (overrides: any = {}) => ({
  mutateAsync: vi.fn().mockResolvedValue(undefined),
  isPending: false,
  error: null,
  ...overrides,
});

describe('FavoriteActionButton', () => {
  it('renders unsaved state', () => {
    useFavorites.mockReturnValue({ data: [] });
    useSaveFavorite.mockReturnValue(createSaveMock());
    useRemoveFavorite.mockReturnValue(createRemoveMock());

    const html = renderToStaticMarkup(<FavoriteActionButton episodeId="ep-1" />);

    expect(html).toContain('aria-label="Save episode"');
    expect(html).toContain('aria-pressed="false"');
  });

  it('renders saved state', () => {
    useFavorites.mockReturnValue({ data: [{ episodeId: 'ep-1' }] });
    useSaveFavorite.mockReturnValue(createSaveMock());
    useRemoveFavorite.mockReturnValue(createRemoveMock());

    const html = renderToStaticMarkup(<FavoriteActionButton episodeId="ep-1" />);

    expect(html).toContain('aria-label="Remove saved episode"');
    expect(html).toContain('aria-pressed="true"');
  });

  it('renders loading state when mutation is pending', () => {
    useFavorites.mockReturnValue({ data: [] });
    useSaveFavorite.mockReturnValue(createSaveMock({ isPending: true }));
    useRemoveFavorite.mockReturnValue(createRemoveMock());

    const html = renderToStaticMarkup(<FavoriteActionButton episodeId="ep-1" />);

    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled');
  });

  it('renders error state when mutation error occurs', () => {
    useFavorites.mockReturnValue({ data: [] });
    useSaveFavorite.mockReturnValue(createSaveMock({ error: { message: 'Server error' } }));
    useRemoveFavorite.mockReturnValue(createRemoveMock());

    const html = renderToStaticMarkup(<FavoriteActionButton episodeId="ep-1" />);

    expect(html).toContain('Server error');
  });
});
