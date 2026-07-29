import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockRuntime = {
  appendToQueue: vi.fn(),
  loadItem: vi.fn(),
};

const mockSearchResults = {
  data: {
    podcasts: { data: [] },
    episodes: [
      {
        id: 'ep-1',
        title: 'Search Episode',
        description: 'A search result',
        audioUrl: 'https://example.com/ep-1.mp3',
        podcastId: 'pod-1',
        podcast: { title: 'Search Podcast' },
        publishedAt: '2024-01-01',
      },
    ],
  },
  isLoading: false,
  isError: false,
  error: null,
};

vi.mock('@/features/player', () => ({
  usePlayerRuntime: () => mockRuntime,
}));

vi.mock('../hooks/useSearchResults', () => ({
  useSearchResults: () => mockSearchResults,
}));

const { SearchResultsPanel } = await import('./SearchResultsPanel');

describe('SearchResultsPanel', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    mockRuntime.appendToQueue.mockReset();
    mockRuntime.loadItem.mockReset();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('queues the selected episode from search results', () => {
    act(() => {
      root.render(<SearchResultsPanel query="search" />);
    });

    const addButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('افزودن به صف')) as HTMLButtonElement | undefined;
    expect(addButton).toBeDefined();

    act(() => {
      addButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(mockRuntime.appendToQueue).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'ep-1',
        title: 'Search Episode',
        sourceType: 'episode',
      }),
    );
  });
});
