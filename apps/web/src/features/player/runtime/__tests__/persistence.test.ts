// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';

import {
  writePersistedPlayerSnapshot,
  readPersistedPlayerSnapshot,
  applyPersistedSnapshotToStore,
  PersistedPlayerSnapshot,
} from '../playerPersistence';

import { usePlayerStore } from '../../store/playerStore';

beforeEach(() => {
  // clear localStorage between tests
  window.localStorage.clear();
  usePlayerStore.getState().resetPlayer();
});

describe('playerPersistence', () => {
  it('writes and reads full snapshot', () => {
    const snapshot: PersistedPlayerSnapshot = {
      currentItem: { id: 'a', title: 'A', subtitle: '', audioUrl: 'https://a', artworkUrl: '', duration: 10, podcastId: 'p1', sourceType: 'unknown' },
      queue: [
        { id: 'a', title: 'A', subtitle: '', audioUrl: 'https://a', artworkUrl: '', duration: 10, podcastId: 'p1', sourceType: 'unknown' },
        { id: 'b', title: 'B', subtitle: '', audioUrl: 'https://b', artworkUrl: '', duration: 20, podcastId: 'p1', sourceType: 'unknown' },
      ],
      currentIndex: 1,
      playbackStatus: 'paused',
      duration: 20,
      currentPosition: 5,
      volume: 0.55,
      repeatMode: 'queue',
      shuffleEnabled: true,
      error: null,
    };

    writePersistedPlayerSnapshot(snapshot);

    const read = readPersistedPlayerSnapshot();

    expect(read).not.toBeNull();
    expect(read?.queue.length).toBe(2);
    expect(read?.currentIndex).toBe(1);
    expect(read?.repeatMode).toBe('queue');
    expect(read?.shuffleEnabled).toBe(true);
    expect(read?.volume).toBeCloseTo(0.55, 5);
  });

  it('reconstructs queue when missing but currentItem exists', () => {
    const snapshot: PersistedPlayerSnapshot = {
      currentItem: { id: 'x', title: 'X', subtitle: '', audioUrl: 'https://x', artworkUrl: '', duration: 30, podcastId: 'p2', sourceType: 'unknown' },
      queue: [],
      currentIndex: -1,
      playbackStatus: 'paused',
      duration: 30,
      currentPosition: 0,
      volume: 0.8,
      repeatMode: 'off',
      shuffleEnabled: false,
      error: null,
    };

    applyPersistedSnapshotToStore(snapshot);

    const state = usePlayerStore.getState();
    expect(state.queue.length).toBe(1);
    expect(state.currentIndex).toBe(0);
    expect(state.currentItem?.id).toBe('x');
  });

  it('ensures queue[currentIndex] equals currentItem when mismatch', () => {
    const snapshot: PersistedPlayerSnapshot = {
      currentItem: { id: 'z', title: 'Z', subtitle: '', audioUrl: 'https://z', artworkUrl: '', duration: 15, podcastId: 'p3', sourceType: 'unknown' },
      queue: [
        { id: 'a', title: 'A', subtitle: '', audioUrl: 'https://a', artworkUrl: '', duration: 10, podcastId: 'p3', sourceType: 'unknown' },
      ],
      currentIndex: 0,
      playbackStatus: 'paused',
      duration: 15,
      currentPosition: 0,
      volume: 0.3,
      repeatMode: 'one',
      shuffleEnabled: false,
      error: null,
    };

    applyPersistedSnapshotToStore(snapshot);

    const state = usePlayerStore.getState();
    expect(state.queue.length).toBe(2);
    expect(state.queue[state.currentIndex].id).toBe(state.currentItem?.id);
    expect(state.repeatMode).toBe('one');
    expect(state.volume).toBeCloseTo(0.3, 5);
  });

  it('preserves queue integrity after queue mutations and restore', () => {
    const currentItem = { id: 'current', title: 'Current', subtitle: '', audioUrl: 'https://current', artworkUrl: '', duration: 40, podcastId: 'p4', sourceType: 'episode' as const };
    const nextItem = { id: 'next', title: 'Next', subtitle: '', audioUrl: 'https://next', artworkUrl: '', duration: 45, podcastId: 'p4', sourceType: 'episode' as const };

    usePlayerStore.setState({
      currentItem,
      queue: [currentItem, nextItem],
      currentIndex: 0,
      playbackStatus: 'playing',
      duration: 40,
      currentPosition: 12,
      error: null,
      volume: 0.8,
      repeatMode: 'off',
      shuffleEnabled: false,
      isPlaying: true,
    });

    writePersistedPlayerSnapshot({
      currentItem: usePlayerStore.getState().currentItem,
      queue: usePlayerStore.getState().queue,
      currentIndex: usePlayerStore.getState().currentIndex,
      playbackStatus: usePlayerStore.getState().playbackStatus,
      duration: usePlayerStore.getState().duration,
      currentPosition: usePlayerStore.getState().currentPosition,
      volume: usePlayerStore.getState().volume,
      repeatMode: usePlayerStore.getState().repeatMode,
      shuffleEnabled: usePlayerStore.getState().shuffleEnabled,
      error: usePlayerStore.getState().error,
    });

    const restored = readPersistedPlayerSnapshot();
    applyPersistedSnapshotToStore(restored!);

    const state = usePlayerStore.getState();
    expect(state.queue[state.currentIndex]?.id).toBe(state.currentItem?.id);
    expect(state.queue.length).toBe(2);
  });
});
