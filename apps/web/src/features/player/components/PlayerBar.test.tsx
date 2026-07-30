import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockRuntime = {
  appendToQueue: vi.fn(),
  removeFromQueue: vi.fn(),
  clearQueue: vi.fn(),
  loadItem: vi.fn(),
};

let mockState: any;

vi.mock('../hooks/usePlayerRuntime', () => ({
  usePlayerRuntime: () => mockRuntime,
}));

vi.mock('../hooks/usePlayerState', () => ({
  usePlayerState: () => mockState,
}));

vi.mock('./PlayerControls', () => ({
  PlayerControls: () => <div data-testid="player-controls" />,
}));

vi.mock('./PlayerInfo', () => ({
  PlayerInfo: () => <div data-testid="player-info" />,
}));

vi.mock('./PlayerProgress', () => ({
  PlayerProgress: () => <div data-testid="player-progress" />,
}));

vi.mock('./PlayerVolume', () => ({
  PlayerVolume: () => <div data-testid="player-volume" />,
}));

const { PlayerBar } = await import('./PlayerBar');

const createItem = (id: string, title: string) => ({
  id,
  title,
  subtitle: `Subtitle ${title}`,
  audioUrl: `https://example.com/${id}.mp3`,
  sourceType: 'episode' as const,
});

describe('PlayerBar', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    mockRuntime.appendToQueue.mockReset();
    mockRuntime.removeFromQueue.mockReset();
    mockRuntime.clearQueue.mockReset();
    mockRuntime.loadItem.mockReset();
    mockRuntime.removeFromQueue.mockReturnValue(true);
    mockState = {
      currentItem: createItem('current', 'Current Episode'),
      playbackStatus: 'playing',
      error: null,
      currentPosition: 0,
      duration: 180,
      queue: [createItem('current', 'Current Episode'), createItem('next', 'Next Episode')],
      currentIndex: 0,
      repeatMode: 'off',
      shuffleEnabled: false,
    };
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('opens the queue panel and renders current and upcoming items', () => {
    act(() => {
      root.render(<PlayerBar />);
    });

    const openButton = container.querySelector('button[aria-label="باز کردن صف پخش"]') as HTMLButtonElement;
    expect(openButton).not.toBeNull();

    act(() => {
      openButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('صف پخش');
    expect(container.textContent).toContain('در حال پخش');
    expect(container.textContent).toContain('Current Episode');
    expect(container.textContent).toContain('Next Episode');
  });

  it('calls the runtime to remove the selected queue item', () => {
    act(() => {
      root.render(<PlayerBar />);
    });

    const openButton = container.querySelector('button[aria-label="باز کردن صف پخش"]') as HTMLButtonElement;
    act(() => {
      openButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const removeButton = container.querySelector('[data-testid="queue-remove-next"]') as HTMLButtonElement | null;
    expect(removeButton).not.toBeNull();

    act(() => {
      removeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(mockRuntime.removeFromQueue).toHaveBeenCalledWith('next');
  });

  it('renders a retry action for playback errors and resumes from the saved position', () => {
    mockState = {
      ...mockState,
      error: 'Unable to play episode.',
      playbackStatus: 'paused',
      currentPosition: 42,
    };

    act(() => {
      root.render(<PlayerBar />);
    });

    const retryButton = container.querySelector('button[aria-label="تلاش مجدد برای پخش"]') as HTMLButtonElement | null;
    expect(retryButton).not.toBeNull();

    act(() => {
      retryButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(mockRuntime.loadItem).toHaveBeenCalledWith(expect.objectContaining({ id: 'current' }), { startTime: 42 });
  });

  it('closes the queue panel when Escape is pressed', () => {
    act(() => {
      root.render(<PlayerBar />);
    });

    const openButton = container.querySelector('button[aria-label="باز کردن صف پخش"]') as HTMLButtonElement;
    act(() => {
      openButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.querySelector('[role="dialog"]')).not.toBeNull();

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it('opens the immersive player experience from the compact bar', () => {
    act(() => {
      root.render(<PlayerBar />);
    });

    const expandButton = container.querySelector('button[aria-label="گسترش پخش‌کننده"]') as HTMLButtonElement | null;
    expect(expandButton).not.toBeNull();

    act(() => {
      expandButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('پخش تعاملی');
    expect(container.textContent).toContain('بحث لحظه‌ای');
  });
});
