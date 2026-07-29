import { usePlayerStore } from '../store/playerStore';
import type { PlayableItem, PlayerPlaybackStatus, PlayerRepeatMode } from '../types';

const PLAYER_STORAGE_KEY = 'castaminofen-player-state';

type BrowserWindowLike = Window & typeof globalThis;

const getBrowserWindow = (): BrowserWindowLike | undefined => {
  const candidate = (globalThis as typeof globalThis & { window?: BrowserWindowLike }).window;
  return candidate;
};

const getStorage = () => getBrowserWindow()?.localStorage;

export interface PersistedPlayerSnapshot {
  currentItem: PlayableItem | null;
  queue: PlayableItem[];
  currentIndex: number;
  playbackStatus: PlayerPlaybackStatus;
  duration: number;
  currentPosition: number;
  volume: number;
  repeatMode: PlayerRepeatMode;
  shuffleEnabled: boolean;
  error: string | null;
}

const normalizeTime = (value: number) => (Number.isFinite(value) && value >= 0 ? value : 0);

const normalizeItem = (item: PlayableItem | null | undefined): PlayableItem | null => {
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    audioUrl: item.audioUrl,
    artworkUrl: item.artworkUrl,
    duration: item.duration,
    podcastId: item.podcastId,
    sourceType: item.sourceType,
  };
};

export function readPersistedPlayerSnapshot(): PersistedPlayerSnapshot | null {
  const storage = getStorage();

  if (!storage) {
    return null;
  }

  const rawValue = storage.getItem(PLAYER_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<PersistedPlayerSnapshot> | null;

    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    const repeatMode = parsed.repeatMode === 'one' || parsed.repeatMode === 'queue' || parsed.repeatMode === 'off' ? parsed.repeatMode : 'off';

    const shuffleEnabled = typeof parsed.shuffleEnabled === 'boolean' ? parsed.shuffleEnabled : false;

    return {
      currentItem: normalizeItem(parsed.currentItem ?? null),
      queue: Array.isArray(parsed.queue) ? parsed.queue.map(normalizeItem).filter(Boolean) as PlayableItem[] : [],
      currentIndex: Number.isFinite(parsed.currentIndex) ? Math.max(-1, Math.trunc(parsed.currentIndex as number)) : -1,
      playbackStatus: parsed.playbackStatus === 'playing' || parsed.playbackStatus === 'paused' || parsed.playbackStatus === 'loading' || parsed.playbackStatus === 'idle'
        ? parsed.playbackStatus
        : 'paused',
      duration: normalizeTime(parsed.duration ?? 0),
      currentPosition: normalizeTime(parsed.currentPosition ?? 0),
      volume: Number.isFinite(parsed.volume) ? Math.min(1, Math.max(0, parsed.volume as number)) : 0.8,
      repeatMode,
      shuffleEnabled,
      error: parsed.error ?? null,
    };
  } catch {
    return null;
  }
}

export function writePersistedPlayerSnapshot(snapshot: PersistedPlayerSnapshot): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(
      PLAYER_STORAGE_KEY,
      JSON.stringify({
        currentItem: normalizeItem(snapshot.currentItem),
        queue: Array.isArray(snapshot.queue) ? snapshot.queue.map(normalizeItem) : [],
        currentIndex: Number.isFinite(snapshot.currentIndex) ? snapshot.currentIndex : -1,
        playbackStatus: snapshot.playbackStatus,
        duration: normalizeTime(snapshot.duration),
        currentPosition: normalizeTime(snapshot.currentPosition),
        volume: Number.isFinite(snapshot.volume) ? Math.min(1, Math.max(0, snapshot.volume)) : 0.8,
        repeatMode: snapshot.repeatMode,
        shuffleEnabled: !!snapshot.shuffleEnabled,
        error: snapshot.error ?? null,
      }),
    );
  } catch {
    // Ignore persistence failures in non-browser environments.
  }
}

export function clearPersistedPlayerSnapshot(): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(PLAYER_STORAGE_KEY);
  } catch {
    // Ignore cleanup failures.
  }
}

export function persistCurrentPlayerState(): void {
  const state = usePlayerStore.getState();

  writePersistedPlayerSnapshot({
    currentItem: state.currentItem,
    queue: state.queue ?? [],
    currentIndex: Number.isFinite(state.currentIndex) ? state.currentIndex : -1,
    playbackStatus: state.playbackStatus,
    duration: normalizeTime(state.duration),
    currentPosition: normalizeTime(state.currentPosition),
    volume: Number.isFinite(state.volume) ? Math.min(1, Math.max(0, state.volume)) : 0.8,
    repeatMode: state.repeatMode,
    shuffleEnabled: !!state.shuffleEnabled,
    error: state.error ?? null,
  });
}

export function applyPersistedSnapshotToStore(snapshot: PersistedPlayerSnapshot): void {
  const store = usePlayerStore.getState();

  // Normalize queue
  const normalizedQueue = Array.isArray(snapshot.queue) ? snapshot.queue.filter(Boolean) : [];
  let safeIndex = Number.isFinite(snapshot.currentIndex) ? snapshot.currentIndex : -1;

  if (!normalizedQueue.length && snapshot.currentItem) {
    normalizedQueue.push(snapshot.currentItem);
    safeIndex = 0;
  }

  // Ensure currentIndex is within bounds and that queue[currentIndex] matches currentItem
  if (normalizedQueue.length === 0) {
    safeIndex = -1;
  } else {
    if (safeIndex < 0 || safeIndex >= normalizedQueue.length) {
      // Try to find currentItem in queue
      const found = snapshot.currentItem ? normalizedQueue.findIndex((i) => i.id === snapshot.currentItem?.id) : -1;
      if (found >= 0) {
        safeIndex = found;
      } else if (snapshot.currentItem) {
        // insert currentItem at safeIndex (clamped)
        const insertAt = Math.max(0, Math.min(normalizedQueue.length, safeIndex < 0 ? 0 : safeIndex));
        normalizedQueue.splice(insertAt, 0, snapshot.currentItem);
        safeIndex = insertAt;
      } else {
        safeIndex = 0;
      }
    } else {
      // Index is within bounds. If the item at currentIndex doesn't match currentItem,
      // try to find currentItem in the queue or insert it at safeIndex.
      if (snapshot.currentItem && normalizedQueue[safeIndex].id !== snapshot.currentItem.id) {
        const found = normalizedQueue.findIndex((i) => i.id === snapshot.currentItem?.id);
        if (found >= 0) {
          safeIndex = found;
        } else {
          const insertAt = Math.max(0, Math.min(normalizedQueue.length, safeIndex));
          normalizedQueue.splice(insertAt, 0, snapshot.currentItem);
          safeIndex = insertAt;
        }
      }
    }
  }

  const currentItem = safeIndex >= 0 && normalizedQueue[safeIndex] ? normalizedQueue[safeIndex] : snapshot.currentItem ?? null;

  usePlayerStore.setState({
    queue: normalizedQueue,
    currentIndex: safeIndex,
    currentItem: currentItem ?? null,
    playbackStatus: snapshot.playbackStatus,
    duration: snapshot.duration,
    currentPosition: snapshot.currentPosition,
    error: snapshot.error ?? null,
    volume: Number.isFinite(snapshot.volume) ? Math.min(1, Math.max(0, snapshot.volume)) : store.volume,
    repeatMode: snapshot.repeatMode,
    shuffleEnabled: !!snapshot.shuffleEnabled,
    isPlaying: snapshot.playbackStatus === 'playing',
  });
}
