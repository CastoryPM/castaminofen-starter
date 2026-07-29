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
      currentItem: { id: 'a', title: 'A', subtitle: '', audioUrl: 'https://a', artworkUrl: '', duration: 10, podcastId: 'p1', sourceType: 'rss' },
      queue: [
        { id: 'a', title: 'A', subtitle: '', audioUrl: 'https://a', artworkUrl: '', duration: 10, podcastId: 'p1', sourceType: 'rss' },
        { id: 'b', title: 'B', subtitle: '', audioUrl: 'https://b', artworkUrl: '', duration: 20, podcastId: 'p1', sourceType: 'rss' },
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
      currentItem: { id: 'x', title: 'X', subtitle: '', audioUrl: 'https://x', artworkUrl: '', duration: 30, podcastId: 'p2', sourceType: 'rss' },
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
      currentItem: { id: 'z', title: 'Z', subtitle: '', audioUrl: 'https://z', artworkUrl: '', duration: 15, podcastId: 'p3', sourceType: 'rss' },
      queue: [
        { id: 'a', title: 'A', subtitle: '', audioUrl: 'https://a', artworkUrl: '', duration: 10, podcastId: 'p3', sourceType: 'rss' },
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
});
