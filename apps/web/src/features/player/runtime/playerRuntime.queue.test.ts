import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPlayerRuntimeController } from './playerRuntime';
import { usePlayerStore } from '../store/playerStore';

const createItem = (id: string) => ({
  id,
  title: `Episode ${id}`,
  audioUrl: `https://example.com/${id}.mp3`,
  sourceType: 'episode' as const,
});

const createEngineMock = () => ({
  load: vi.fn(),
  play: vi.fn(async () => {}),
  pause: vi.fn(),
  stop: vi.fn(),
  setVolume: vi.fn(),
  setCurrentTime: vi.fn(),
  getCurrentTime: vi.fn(() => 0),
  getDuration: vi.fn(() => 0),
  subscribe: vi.fn(() => () => {}),
  destroy: vi.fn(),
});

describe('player queue runtime actions', () => {
  beforeEach(() => {
    usePlayerStore.getState().resetPlayer();
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        localStorage: {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
          clear: () => {},
        },
        addEventListener: () => {},
      },
    });
  });

  it('appends a real playable item and preserves the current item identity', () => {
    const controller = createPlayerRuntimeController(usePlayerStore.getState(), createEngineMock());
    const currentItem = createItem('current');
    const queuedItem = createItem('queued');

    usePlayerStore.setState({
      ...usePlayerStore.getState(),
      currentItem,
      queue: [currentItem],
      currentIndex: 0,
      playbackStatus: 'playing',
      isPlaying: true,
    });

    controller.appendToQueue(queuedItem);

    const state = usePlayerStore.getState();
    expect(state.queue.map((item) => item.id)).toEqual(['current', 'queued']);
    expect(state.currentItem?.id).toBe('current');
    expect(state.currentIndex).toBe(0);
    controller.destroy();
  });

  it('removes a queued item without mutating the current item', () => {
    const controller = createPlayerRuntimeController(usePlayerStore.getState(), createEngineMock());
    const currentItem = createItem('current');
    const queuedItem = createItem('queued');

    usePlayerStore.setState({
      ...usePlayerStore.getState(),
      currentItem,
      queue: [currentItem, queuedItem],
      currentIndex: 0,
      playbackStatus: 'playing',
      isPlaying: true,
    });

    const removed = controller.removeFromQueue(queuedItem.id);

    const state = usePlayerStore.getState();
    expect(removed).toBe(true);
    expect(state.queue.map((item) => item.id)).toEqual(['current']);
    expect(state.currentItem?.id).toBe('current');
    controller.destroy();
  });

  it('keeps queue identity stable when an item is restored from persistence', () => {
    const controller = createPlayerRuntimeController(usePlayerStore.getState(), createEngineMock());
    const persistedItem = createItem('persisted');

    usePlayerStore.setState({
      ...usePlayerStore.getState(),
      currentItem: persistedItem,
      queue: [persistedItem],
      currentIndex: 0,
      playbackStatus: 'paused',
      isPlaying: false,
    });

    controller.appendToQueue(createItem('next'));

    const state = usePlayerStore.getState();
    expect(state.queue[0]?.id).toBe('persisted');
    expect(state.queue[1]?.id).toBe('next');
    controller.destroy();
  });
});
