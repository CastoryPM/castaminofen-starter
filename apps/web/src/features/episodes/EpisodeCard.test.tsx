import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockRuntime = {
  appendToQueue: vi.fn(),
  loadItem: vi.fn(),
};

vi.mock('@/features/player', () => ({
  usePlayerRuntime: () => mockRuntime,
}));

const { EpisodeCard } = await import('./EpisodeCard');

describe('EpisodeCard', () => {
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

  it('queues the real episode item when the user chooses add to queue', () => {
    const episode = {
      id: 'ep-1',
      title: 'Example Episode',
      description: 'A sample episode',
      audioUrl: 'https://example.com/ep-1.mp3',
      podcastId: 'pod-1',
      publishedAt: '2024-01-01',
    };

    act(() => {
      root.render(<EpisodeCard episode={episode as any} />);
    });

    const addButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('افزودن به صف')) as HTMLButtonElement | undefined;
    expect(addButton).toBeDefined();

    act(() => {
      addButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(mockRuntime.appendToQueue).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'ep-1',
        title: 'Example Episode',
        sourceType: 'episode',
      }),
    );
  });
});
