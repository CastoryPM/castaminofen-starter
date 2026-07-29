import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createPlayerRuntimeController, destroyPlayerRuntimeController, getPlayerRuntimeController } from './playerRuntime';
import { usePlayerStore } from '../store/playerStore';

const createItem = (id: string) => ({
  id,
  title: `Episode ${id}`,
  audioUrl: `https://example.com/${id}.mp3`,
  sourceType: 'episode' as const,
});

const createEngineMock = (overrides: Partial<Record<keyof import('./audioEngine').AudioEngine, any>> = {}) => {
  const engine = {
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
    ...overrides,
  };

  return engine as import('./audioEngine').AudioEngine;
};

beforeEach(() => {
  const storage = new Map<string, string>();
  const createStorage = () => ({
    getItem: (key: string) => (storage.has(key) ? storage.get(key) ?? null : null),
    setItem: (key: string, value: string) => {
      storage.set(key, value);
    },
    removeItem: (key: string) => {
      storage.delete(key);
    },
    clear: () => {
      storage.clear();
    },
  });

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: createStorage(),
      addEventListener: () => {},
    },
  });

  usePlayerStore.getState().resetPlayer();
  destroyPlayerRuntimeController();
});

afterEach(() => {
  destroyPlayerRuntimeController();
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: undefined,
  });
});

describe('PlayerRuntime controller', () => {
  test('restores the last player snapshot from storage when the runtime starts', () => {
    const persistedItem = createItem('persisted');
    window.localStorage.setItem(
      'castaminofen-player-state',
      JSON.stringify({
        currentItem: persistedItem,
        playbackStatus: 'paused',
        duration: 180,
        currentPosition: 42,
        error: null,
      }),
    );

    const store = usePlayerStore.getState();
    const controller = createPlayerRuntimeController(store, createEngineMock());

    const state = usePlayerStore.getState();
    expect(state.currentItem?.id).toBe('persisted');
    expect(state.currentPosition).toBe(42);
    expect(state.playbackStatus).toBe('paused');

    controller.destroy();
  });

  test('applies a persisted default volume preference on startup', () => {
    window.localStorage.setItem(
      'castaminofen-settings-preferences',
      JSON.stringify({
        theme: 'System',
        autoplay: true,
        defaultVolume: 0.25,
        resumePlayback: true,
      }),
    );

    const store = usePlayerStore.getState();
    const engine = createEngineMock();
    const controller = createPlayerRuntimeController(store, engine);

    expect(usePlayerStore.getState().volume).toBe(0.25);
    expect(engine.setVolume).toHaveBeenCalledWith(0.25);

    controller.destroy();
  });

  test('repeat queue wraps to the first item when advancing from the end of the queue', () => {
    const store = usePlayerStore.getState();
    const items = [createItem('a'), createItem('b'), createItem('c')];

    usePlayerStore.setState({
      ...store,
      currentItem: items[2],
      queue: items,
      currentIndex: 2,
      repeatMode: 'queue',
    });

    const nextItem = usePlayerStore.getState().goToNext();

    expect(nextItem?.id).toBe('a');
  });

  test('toggleRepeat cycles through off, one, and queue modes', () => {
    const store = usePlayerStore.getState();

    usePlayerStore.setState({
      ...store,
      repeatMode: 'off',
    });

    usePlayerStore.getState().toggleRepeat();
    expect(usePlayerStore.getState().repeatMode).toBe('one');

    usePlayerStore.getState().toggleRepeat();
    expect(usePlayerStore.getState().repeatMode).toBe('queue');

    usePlayerStore.getState().toggleRepeat();
    expect(usePlayerStore.getState().repeatMode).toBe('off');
  });

  test('goToNext uses shuffle selection without mutating the queue order', () => {
    const store = usePlayerStore.getState();
    const items = [createItem('a'), createItem('b'), createItem('c')];
    const originalRandom = Math.random;

    usePlayerStore.setState({
      ...store,
      currentItem: items[2],
      queue: items,
      currentIndex: 2,
      repeatMode: 'off',
      shuffleEnabled: true,
    });

    Math.random = () => 0;

    try {
      const nextItem = usePlayerStore.getState().goToNext();
      expect(nextItem?.id).toBe('a');
    } finally {
      Math.random = originalRandom;
    }

    expect(usePlayerStore.getState().queue.map((item) => item.id)).toEqual(['a', 'b', 'c']);
  });

  test('loadItem reports a clear error when an item has no audio source', async () => {
    const store = usePlayerStore.getState();
    const controller = createPlayerRuntimeController(store, {
      load() {},
      async play() {},
      pause() {},
      stop() {},
      setVolume() {},
      setCurrentTime() {},
      getCurrentTime() {
        return 0;
      },
      getDuration() {
        return 0;
      },
      subscribe() {
        return () => {};
      },
      destroy() {},
    });

    usePlayerStore.setState({
      ...store,
      currentItem: null,
      queue: [],
      currentIndex: -1,
      playbackStatus: 'idle',
      error: null,
      isPlaying: false,
    });

    await controller.loadItem({
      id: 'missing-audio',
      title: 'Missing audio',
      sourceType: 'episode',
    });

    const state = usePlayerStore.getState();
    expect(state.error).toBe('Audio source is unavailable.');
    expect(state.playbackStatus).toBe('idle');
    expect(state.currentItem?.id).toBe('missing-audio');
  });

  test('setCurrentItem does not change playback status or playing state', () => {
    const store = usePlayerStore.getState();
    const item = createItem('x');

    usePlayerStore.setState({
      ...store,
      currentItem: null,
      queue: [],
      currentIndex: -1,
      playbackStatus: 'idle',
      error: null,
      isPlaying: false,
    });

    usePlayerStore.getState().setCurrentItem(item);

    const nextState = usePlayerStore.getState();
    expect(nextState.currentItem?.id).toBe('x');
    expect(nextState.playbackStatus).toBe('idle');
    expect(nextState.isPlaying).toBe(false);
  });

  test('multiple runtime consumers share the same runtime controller', () => {
    const controllerA = getPlayerRuntimeController();
    const controllerB = getPlayerRuntimeController();

    expect(controllerA).toBe(controllerB);
  });

  test('destroy releases audio engine listeners and clears singleton runtime', () => {
    const store = usePlayerStore.getState();
    let unsubscribed = false;

    const controller = createPlayerRuntimeController(store, {
      load() {},
      async play() {},
      pause() {},
      stop() {},
      setVolume() {},
      setCurrentTime() {},
      getCurrentTime() {
        return 0;
      },
      getDuration() {
        return 0;
      },
      subscribe() {
        return () => {
          unsubscribed = true;
        };
      },
      destroy() {},
    });

    controller.destroy();
    expect(unsubscribed).toBe(true);
  });

  test('next stops gracefully when the queue is empty', async () => {
    const store = usePlayerStore.getState();
    const controller = createPlayerRuntimeController(store, {
      load() {},
      async play() {},
      pause() {},
      stop() {},
      setVolume() {},
      setCurrentTime() {},
      getCurrentTime() {
        return 0;
      },
      getDuration() {
        return 0;
      },
      subscribe() {
        return () => {};
      },
      destroy() {},
    });

    usePlayerStore.setState({
      ...store,
      currentItem: null,
      queue: [],
      currentIndex: -1,
      playbackStatus: 'playing',
      error: null,
      isPlaying: true,
    });

    await controller.next();

    const state = usePlayerStore.getState();
    expect(state.playbackStatus).toBe('idle');
    expect(state.error).toBeNull();
  });

  test('replaceQueue empty resets state and stops playback', async () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock();
    const controller = createPlayerRuntimeController(store, engine);

    usePlayerStore.setState({
      ...store,
      currentItem: createItem('a'),
      queue: [createItem('a')],
      currentIndex: 0,
      playbackStatus: 'playing',
      duration: 100,
      currentPosition: 10,
      error: null,
      isPlaying: true,
    });

    await controller.replaceQueue([]);

    const state = usePlayerStore.getState();
    expect(state.queue).toEqual([]);
    expect(state.currentItem).toBeNull();
    expect(state.playbackStatus).toBe('idle');
    expect(state.currentPosition).toBe(0);
    expect(engine.stop).toHaveBeenCalled();
  });

  test('appendToQueue adds an item to the end of the queue without changing current playback state', () => {
    const store = usePlayerStore.getState();
    const controller = createPlayerRuntimeController(store, createEngineMock());
    const currentItem = createItem('a');
    const nextItem = createItem('b');

    usePlayerStore.setState({
      ...store,
      currentItem,
      queue: [currentItem],
      currentIndex: 0,
      playbackStatus: 'playing',
      error: null,
      isPlaying: true,
    });

    controller.appendToQueue(nextItem);

    const state = usePlayerStore.getState();
    expect(state.queue.map((item) => item.id)).toEqual(['a', 'b']);
    expect(state.currentItem?.id).toBe('a');
    expect(state.currentIndex).toBe(0);
    const persisted = window.localStorage.getItem('castaminofen-player-state');
    expect(persisted).toContain('"queue"');
  });

  test('removeFromQueue removes upcoming items and preserves the current item', () => {
    const store = usePlayerStore.getState();
    const controller = createPlayerRuntimeController(store, createEngineMock());
    const currentItem = createItem('a');
    const upcomingItem = createItem('b');
    const trailingItem = createItem('c');

    usePlayerStore.setState({
      ...store,
      currentItem,
      queue: [currentItem, upcomingItem, trailingItem],
      currentIndex: 0,
      playbackStatus: 'playing',
      error: null,
      isPlaying: true,
    });

    const removed = controller.removeFromQueue(upcomingItem.id);

    const state = usePlayerStore.getState();
    expect(removed).toBe(true);
    expect(state.queue.map((item) => item.id)).toEqual(['a', 'c']);
    expect(state.currentItem?.id).toBe('a');
    expect(state.currentIndex).toBe(0);
  });

  test('clearQueue resets playback state and stops audio engine', () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock();
    const controller = createPlayerRuntimeController(store, engine);

    usePlayerStore.setState({
      ...store,
      currentItem: createItem('a'),
      queue: [createItem('a')],
      currentIndex: 0,
      playbackStatus: 'playing',
      duration: 100,
      currentPosition: 10,
      error: null,
      isPlaying: true,
    });

    controller.clearQueue();

    const state = usePlayerStore.getState();
    expect(state.queue).toEqual([]);
    expect(state.currentItem).toBeNull();
    expect(state.playbackStatus).toBe('idle');
    expect(state.currentPosition).toBe(0);
    expect(engine.stop).toHaveBeenCalled();
  });

  test('loadItem loads the episode audio source before playback starts', async () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock();
    const controller = createPlayerRuntimeController(store, engine);

    await controller.loadItem(createItem('audio-load'));

    expect(engine.load).toHaveBeenCalledWith('https://example.com/audio-load.mp3');
    expect(engine.play).toHaveBeenCalled();
  });

  test('play after pause resumes playback and syncs state', async () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock({
      getCurrentTime: vi.fn(() => 5),
      getDuration: vi.fn(() => 100),
    });
    const controller = createPlayerRuntimeController(store, engine);

    usePlayerStore.setState({
      ...store,
      currentItem: createItem('a'),
      queue: [createItem('a')],
      currentIndex: 0,
      playbackStatus: 'paused',
      duration: 100,
      currentPosition: 0,
      error: null,
      isPlaying: false,
    });

    await controller.play();

    expect(engine.play).toHaveBeenCalled();
    expect(usePlayerStore.getState().playbackStatus).toBe('playing');
    expect(usePlayerStore.getState().currentPosition).toBe(5);
  });

  test('loadItem can resume playback from an initial position', async () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock({
      getCurrentTime: vi.fn(() => 42),
      getDuration: vi.fn(() => 180),
    });
    const controller = createPlayerRuntimeController(store, engine);

    await controller.loadItem(createItem('resume'), { startTime: 42 });

    expect(engine.setCurrentTime).toHaveBeenCalledWith(42);
    expect(usePlayerStore.getState().currentPosition).toBe(42);
  });

  test('setCurrentTime updates audio engine and playback position', () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock({ getCurrentTime: vi.fn(() => 30), getDuration: vi.fn(() => 100) });
    const controller = createPlayerRuntimeController(store, engine);

    usePlayerStore.setState({
      ...store,
      currentItem: createItem('a'),
      playbackStatus: 'playing',
      isPlaying: true,
    });

    controller.setCurrentTime(30);

    expect(engine.setCurrentTime).toHaveBeenCalledWith(30);
    expect(usePlayerStore.getState().currentPosition).toBe(30);
  });

  test('setVolume updates audio engine and store', () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock();
    const controller = createPlayerRuntimeController(store, engine);

    usePlayerStore.setState({
      ...store,
      currentItem: createItem('a'),
      playbackStatus: 'paused',
      isPlaying: false,
      volume: 0.8,
    });

    controller.setVolume(0.4);

    expect(engine.setVolume).toHaveBeenCalledWith(0.4);
    expect(usePlayerStore.getState().volume).toBe(0.4);
  });

  test('play handles invalid current item with clear error', async () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock();
    const controller = createPlayerRuntimeController(store, engine);

    usePlayerStore.setState({
      ...store,
      currentItem: { id: 'invalid', title: 'Invalid', sourceType: 'episode' as const },
      queue: [{ id: 'invalid', title: 'Invalid', sourceType: 'episode' as const }],
      currentIndex: 0,
      playbackStatus: 'paused',
      error: null,
      isPlaying: false,
    });

    await controller.play();

    const state = usePlayerStore.getState();
    expect(state.playbackStatus).toBe('idle');
    expect(state.error).toBe('Audio source is unavailable.');
    expect(engine.play).not.toHaveBeenCalled();
  });

  test('error propagation from audio engine play updates state and throws', async () => {
    const store = usePlayerStore.getState();
    const engine = createEngineMock({
      play: vi.fn(async () => {
        throw new Error('Play failed');
      }),
      getCurrentTime: vi.fn(() => 0),
      getDuration: vi.fn(() => 0),
    });
    const controller = createPlayerRuntimeController(store, engine);

    usePlayerStore.setState({
      ...store,
      currentItem: createItem('a'),
      queue: [createItem('a')],
      currentIndex: 0,
      playbackStatus: 'paused',
      error: null,
      isPlaying: false,
    });

    await expect(controller.play()).rejects.toThrow('Play failed');
    expect(usePlayerStore.getState().playbackStatus).toBe('paused');
    expect(usePlayerStore.getState().error).toBe('Unable to play episode.');
  });

  test('multiple rapid next calls only preserve the latest transition', async () => {
    const store = usePlayerStore.getState();
    let resolvePlay: () => void;
    const playPromise = new Promise<void>((resolve) => {
      resolvePlay = resolve;
    });
    const engine = createEngineMock({
      play: vi.fn(() => playPromise),
      getCurrentTime: vi.fn(() => 0),
      getDuration: vi.fn(() => 0),
    });
    const controller = createPlayerRuntimeController(store, engine);
    const items = [createItem('a'), createItem('b'), createItem('c')];

    usePlayerStore.setState({
      ...store,
      currentItem: items[0],
      queue: items,
      currentIndex: 0,
      playbackStatus: 'playing',
      error: null,
      isPlaying: true,
    });

    const first = controller.next();
    const second = controller.next();

    resolvePlay!();
    await Promise.all([first, second]);

    expect(usePlayerStore.getState().currentItem?.id).toBe('c');
  });

  test('multiple rapid previous calls only preserve the latest transition', async () => {
    const store = usePlayerStore.getState();
    let resolvePlay: () => void;
    const playPromise = new Promise<void>((resolve) => {
      resolvePlay = resolve;
    });
    const engine = createEngineMock({
      play: vi.fn(() => playPromise),
      getCurrentTime: vi.fn(() => 0),
      getDuration: vi.fn(() => 0),
    });
    const controller = createPlayerRuntimeController(store, engine);
    const items = [createItem('a'), createItem('b'), createItem('c')];

    usePlayerStore.setState({
      ...store,
      currentItem: items[2],
      queue: items,
      currentIndex: 2,
      playbackStatus: 'playing',
      error: null,
      isPlaying: true,
    });

    const first = controller.previous();
    const second = controller.previous();

    resolvePlay!();
    await Promise.all([first, second]);

    expect(usePlayerStore.getState().currentItem?.id).toBe('a');
  });
});
