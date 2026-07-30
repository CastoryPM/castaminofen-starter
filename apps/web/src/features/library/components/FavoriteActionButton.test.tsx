import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi, type Mock } from 'vitest';

vi.mock('../hooks/useFavorites', () => ({
  useFavorites: vi.fn(),
  useSaveFavorite: vi.fn(),
  useRemoveFavorite: vi.fn(),
}));

const { useFavorites, useSaveFavorite, useRemoveFavorite } = await vi.importMock('../hooks/useFavorites');
const { FavoriteActionButton } = await import('./FavoriteActionButton');

const mockUseFavorites = useFavorites as Mock;
const mockUseSaveFavorite = useSaveFavorite as Mock;
const mockUseRemoveFavorite = useRemoveFavorite as Mock;

const createSaveMock = (overrides: Record<string, unknown> = {}) => ({
  mutateAsync: vi.fn().mockResolvedValue(undefined),
  isPending: false,
  error: null,
  ...overrides,
});

const createRemoveMock = (overrides: Record<string, unknown> = {}) => ({
  mutateAsync: vi.fn().mockResolvedValue(undefined),
  isPending: false,
  error: null,
  ...overrides,
});

describe('FavoriteActionButton', () => {
  it('renders unsaved state', () => {
    mockUseFavorites.mockReturnValue({ data: [] });
    mockUseSaveFavorite.mockReturnValue(createSaveMock());
    mockUseRemoveFavorite.mockReturnValue(createRemoveMock());

    const html = renderToStaticMarkup(<FavoriteActionButton episodeId="ep-1" />);

    expect(html).toContain('aria-label="Save episode"');
    expect(html).toContain('aria-pressed="false"');
  });

  it('renders saved state', () => {
    mockUseFavorites.mockReturnValue({ data: [{ episodeId: 'ep-1' }] });
    mockUseSaveFavorite.mockReturnValue(createSaveMock());
    mockUseRemoveFavorite.mockReturnValue(createRemoveMock());

    const html = renderToStaticMarkup(<FavoriteActionButton episodeId="ep-1" />);

    expect(html).toContain('aria-label="Remove saved episode"');
    expect(html).toContain('aria-pressed="true"');
  });

  it('renders loading state when mutation is pending', () => {
    mockUseFavorites.mockReturnValue({ data: [] });
    mockUseSaveFavorite.mockReturnValue(createSaveMock({ isPending: true }));
    mockUseRemoveFavorite.mockReturnValue(createRemoveMock());

    const html = renderToStaticMarkup(<FavoriteActionButton episodeId="ep-1" />);

    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled');
  });

  it('renders error state when mutation error occurs', () => {
    mockUseFavorites.mockReturnValue({ data: [] });
    mockUseSaveFavorite.mockReturnValue(createSaveMock({ error: { message: 'Server error' } }));
    mockUseRemoveFavorite.mockReturnValue(createRemoveMock());

    const html = renderToStaticMarkup(<FavoriteActionButton episodeId="ep-1" />);

    expect(html).toContain('Server error');
  });
});
