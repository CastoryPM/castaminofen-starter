import { createBrowserAudioEngine, type AudioEngine } from './audioEngine';
import { usePlayerStore } from '../store/playerStore';
import type { PlayableItem, PlayerPlaybackStatus } from '../types';
import type { PlayerState } from '../store/playerStore';
import { readSettingsPreferences } from '../../settings/services/preferencesPersistence';
import { clearPersistedPlayerSnapshot, persistCurrentPlayerState, readPersistedPlayerSnapshot, applyPersistedSnapshotToStore } from './playerPersistence';

export type PlayerRuntimeController = {
  loadItem(item: PlayableItem, options?: { startTime?: number }): Promise<void>;
  play(): Promise<void>;
  pause(): void;
  stop(): void;
  setVolume(volume: number): void;
  setCurrentTime(position: number): void;
  replaceQueue(items: PlayableItem[], startIndex?: number): Promise<void>;
  appendToQueue(item: PlayableItem): void;
  removeFromQueue(itemId: string): boolean;
  clearQueue(): void;
  next(): Promise<void>;
  previous(): Promise<void>;
  destroy(): void;
};

export function createPlayerRuntimeController(store: PlayerState, engine: AudioEngine = createBrowserAudioEngine()): PlayerRuntimeController {
  // Token used to ignore outdated load/play completions when multiple
  // rapid load/play requests happen. Incrementing this token makes earlier
  // promises no-ops so they don't overwrite newer state.
  let currentLoadToken = 0;
  let activeItemId: string | null = null;
  const getStoreState = () => usePlayerStore.getState();

  const normalizeTime = (value: number) => (Number.isFinite(value) && value >= 0 ? value : 0);

  const applyDefaultVolumePreference = () => {
    const preferences = readSettingsPreferences();
    const safeVolume = Math.min(1, Math.max(0, preferences.defaultVolume));

    engine.setVolume(safeVolume);
    store.setVolume(safeVolume);
  };

  const restorePersistedSnapshot = () => {
    const preferences = readSettingsPreferences();

    if (!preferences.resumePlayback) {
      clearPersistedPlayerSnapshot();
      return;
    }

    const snapshot = readPersistedPlayerSnapshot();

    if (!snapshot) {
      return;
    }

    // Apply the full persisted snapshot to the store (queue, index, modes, volume)
    // and then ensure the engine volume matches the restored volume.
    // applyPersistedSnapshotToStore handles normalization and queue reconstruction.
    applyPersistedSnapshotToStore(snapshot);

    try {
      engine.setVolume(snapshot.volume ?? store.volume ?? 0.8);
    } catch {
      // ignore engine volume failures in non-browser or test environments
    }
  };

  const syncState = (snapshot?: { playbackStatus: PlayerPlaybackStatus; duration: number; currentPosition: number; error: string | null }) => {
    store.setPlaybackState({
      currentPosition: normalizeTime(snapshot?.currentPosition ?? engine.getCurrentTime()),
      duration: normalizeTime(snapshot?.duration ?? engine.getDuration()),
      error: snapshot?.error ?? null,
      playbackStatus: snapshot?.playbackStatus ?? 'paused',
    });
    persistCurrentPlayerState();
  };

  const stopPlaybackGracefully = (snapshot?: { playbackStatus: PlayerPlaybackStatus; duration: number; currentPosition: number; error: string | null }) => {
    currentLoadToken += 1;
    activeItemId = null;

    const finalPosition = normalizeTime(snapshot?.currentPosition ?? engine.getCurrentTime());
    const finalDuration = normalizeTime(snapshot?.duration ?? engine.getDuration());
    const currentStore = getStoreState();

    engine.stop();
    store.setPlaybackState({
      currentItem: currentStore.currentItem,
      playbackStatus: 'idle',
      duration: finalDuration,
      currentPosition: finalPosition,
      error: snapshot?.error ?? null,
    });
    persistCurrentPlayerState();
  };

  const playItem = async (item: PlayableItem, options?: { startTime?: number }) => {
    applyDefaultVolumePreference();
    const loadToken = ++currentLoadToken;
    activeItemId = item.id;
    const startTime = normalizeTime(options?.startTime ?? 0);

    if (!item.audioUrl) {
      store.setCurrentItem(item);
      store.setPlaybackState({
        currentItem: item,
        playbackStatus: 'idle',
        duration: 0,
        currentPosition: 0,
        error: 'Audio source is unavailable.',
      });
      engine.stop();
      activeItemId = null;
      persistCurrentPlayerState();
      return;
    }

    store.setCurrentItem(item);
    store.setPlaybackState({
      currentItem: item,
      playbackStatus: 'loading',
      duration: 0,
      currentPosition: startTime,
      error: null,
    });
    persistCurrentPlayerState();

    engine.load(item.audioUrl);

    if (startTime > 0) {
      engine.setCurrentTime(startTime);
    }

    try {
      await engine.play();

      if (loadToken !== currentLoadToken) return;
      if (activeItemId !== item.id) return;

      store.setPlaybackState({
        currentItem: item,
        playbackStatus: 'playing',
        duration: normalizeTime(engine.getDuration()),
        currentPosition: startTime > 0 ? startTime : normalizeTime(engine.getCurrentTime()),
        error: null,
      });
      persistCurrentPlayerState();
    } catch (error) {
      if (loadToken !== currentLoadToken) return;
      if (activeItemId !== item.id) return;

      store.setPlaybackState({
        currentItem: item,
        playbackStatus: 'paused',
        duration: normalizeTime(engine.getDuration()),
        currentPosition: normalizeTime(engine.getCurrentTime()),
        error: 'Unable to play episode.',
      });
      persistCurrentPlayerState();
      throw error;
    }
  };

  const moveToNextQueueItem = async () => {
    const currentStore = getStoreState();

    if (!currentStore.queue.length) {
      stopPlaybackGracefully({
        playbackStatus: 'idle',
        duration: engine.getDuration(),
        currentPosition: engine.getCurrentTime(),
        error: null,
      });
      return;
    }

    if (currentStore.repeatMode === 'one' && currentStore.currentItem) {
      await playItem(currentStore.currentItem);
      return;
    }

    const nextItem = store.goToNext();
    if (!nextItem) {
      stopPlaybackGracefully({
        playbackStatus: 'idle',
        duration: engine.getDuration(),
        currentPosition: engine.getCurrentTime(),
        error: null,
      });
      return;
    }

    await playItem(nextItem);
  };

  const unsubscribe = engine.subscribe((snapshot) => {
    const currentStore = getStoreState();
    if (activeItemId && currentStore.currentItem?.id !== activeItemId) {
      return;
    }

    const preferences = readSettingsPreferences();

    if (snapshot.playbackStatus === 'idle' && snapshot.currentPosition > 0 && currentStore.currentItem && currentStore.isPlaying && preferences.autoplay) {
      void moveToNextQueueItem();
      return;
    }

    if (snapshot.error) {
      store.setPlaybackState({
        playbackStatus: snapshot.playbackStatus,
        duration: normalizeTime(snapshot.duration),
        currentPosition: normalizeTime(snapshot.currentPosition),
        error: snapshot.error,
      });
      persistCurrentPlayerState();
      return;
    }

    syncState(snapshot);
  });

  applyDefaultVolumePreference();
  restorePersistedSnapshot();

  return {
    async loadItem(item, options) {
      store.replaceQueue([item], 0);
      await playItem(item, options);
    },
    async play() {
      const currentStore = getStoreState();
      const currentItem = currentStore.currentItem ?? currentStore.queue[currentStore.currentIndex] ?? currentStore.queue[0] ?? null;

      if (!currentItem?.audioUrl) {
        store.setPlaybackState({
          playbackStatus: 'idle',
          duration: 0,
          currentPosition: 0,
          error: currentItem ? 'Audio source is unavailable.' : 'No playable item selected.',
        });
        engine.stop();
        currentLoadToken += 1;
        activeItemId = null;
        persistCurrentPlayerState();
        return;
      }

      if (currentStore.playbackStatus === 'playing') {
        return;
      }

      if (currentStore.playbackStatus === 'loading') {
        return;
      }

      currentLoadToken += 1;
      activeItemId = currentItem.id;
      const token = currentLoadToken;

      try {
        await engine.play();

        if (token !== currentLoadToken) return;
        const latestStore = getStoreState();
        if (activeItemId && latestStore.currentItem?.id !== activeItemId) return;

        store.setPlaybackState({
          currentItem: latestStore.currentItem,
          playbackStatus: 'playing',
          duration: normalizeTime(engine.getDuration()),
          currentPosition: normalizeTime(engine.getCurrentTime()),
          error: null,
        });
        persistCurrentPlayerState();
      } catch (error) {
        if (token !== currentLoadToken) return;

        store.setPlaybackState({
          playbackStatus: 'paused',
          duration: normalizeTime(engine.getDuration()),
          currentPosition: normalizeTime(engine.getCurrentTime()),
          error: 'Unable to play episode.',
        });
        persistCurrentPlayerState();
        throw error;
      }
    },
    pause() {
      engine.pause();
      store.setPlaybackState({
        playbackStatus: 'paused',
        duration: normalizeTime(engine.getDuration()),
        currentPosition: normalizeTime(engine.getCurrentTime()),
        error: null,
      });
      persistCurrentPlayerState();
    },
    stop() {
      const currentStore = getStoreState();
      currentLoadToken += 1;
      activeItemId = null;
      engine.stop();
      store.setPlaybackState({
        currentItem: currentStore.currentItem,
        playbackStatus: 'idle',
        duration: normalizeTime(engine.getDuration()),
        currentPosition: 0,
        error: null,
      });
      persistCurrentPlayerState();
    },
    setVolume(volume) {
      engine.setVolume(volume);
      store.setVolume(volume);
      syncState();
    },
    setCurrentTime(position) {
      const safePosition = Number.isFinite(position) ? Math.max(0, position) : 0;
      engine.setCurrentTime(safePosition);
      syncState();
    },
    async replaceQueue(items, startIndex = 0) {
      if (!items.length) {
        currentLoadToken += 1;
        activeItemId = null;
        store.clearQueue();
        store.setPlaybackState({
          currentItem: null,
          playbackStatus: 'idle',
          duration: 0,
          currentPosition: 0,
          error: null,
        });
        engine.stop();
        clearPersistedPlayerSnapshot();
        return;
      }

      const targetIndex = Math.max(0, Math.min(startIndex, items.length - 1));
      const targetItem = items[targetIndex] ?? items[0];

      store.replaceQueue(items, targetIndex);
      persistCurrentPlayerState();
      await playItem(targetItem);
    },
    appendToQueue(item) {
      if (!item) {
        return;
      }

      store.appendToQueue(item);
      persistCurrentPlayerState();
    },
    removeFromQueue(itemId) {
      const removed = store.removeFromQueue(itemId);
      persistCurrentPlayerState();
      return removed;
    },
    clearQueue() {
      currentLoadToken += 1;
      activeItemId = null;
      store.clearQueue();
      store.setPlaybackState({
        currentItem: null,
        playbackStatus: 'idle',
        duration: 0,
        currentPosition: 0,
        error: null,
      });
      engine.stop();
      clearPersistedPlayerSnapshot();
    },
    async next() {
      await moveToNextQueueItem();
    },
    async previous() {
      const currentStore = getStoreState();
      if (!currentStore.queue.length) {
        stopPlaybackGracefully({
          playbackStatus: 'idle',
          duration: engine.getDuration(),
          currentPosition: engine.getCurrentTime(),
          error: null,
        });
        return;
      }

      const previousItem = store.goToPrevious();

      if (!previousItem) {
        return;
      }

      await playItem(previousItem);
    },
    destroy() {
      unsubscribe();
      engine.destroy();
    },
  };
}

let sharedPlayerRuntimeController: PlayerRuntimeController | null = null;

export function getPlayerRuntimeController(): PlayerRuntimeController {
  if (!sharedPlayerRuntimeController) {
    sharedPlayerRuntimeController = createPlayerRuntimeController(usePlayerStore.getState());

    const browserWindow = (globalThis as typeof globalThis & { window?: Window }).window;

    if (browserWindow && 'addEventListener' in browserWindow) {
      browserWindow.addEventListener('beforeunload', destroyPlayerRuntimeController, { once: true });
    }
  }

  return sharedPlayerRuntimeController;
}

export function destroyPlayerRuntimeController() {
  sharedPlayerRuntimeController?.destroy();
  sharedPlayerRuntimeController = null;
}
