import { usePlayerStore } from '../store/playerStore';
import type { PlayableItem, PlayerPlaybackStatus } from '../types';

const PLAYER_STORAGE_KEY = 'castaminofen-player-state';

type BrowserWindowLike = Window & typeof globalThis;

const getBrowserWindow = (): BrowserWindowLike | undefined => {
  const candidate = (globalThis as typeof globalThis & { window?: BrowserWindowLike }).window;
  return candidate;
};

const getStorage = () => getBrowserWindow()?.localStorage;

export interface PersistedPlayerSnapshot {
  currentItem: PlayableItem | null;
  playbackStatus: PlayerPlaybackStatus;
  duration: number;
  currentPosition: number;
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

    return {
      currentItem: normalizeItem(parsed.currentItem ?? null),
      playbackStatus: parsed.playbackStatus === 'playing' || parsed.playbackStatus === 'paused' || parsed.playbackStatus === 'loading' || parsed.playbackStatus === 'idle'
        ? parsed.playbackStatus
        : 'paused',
      duration: normalizeTime(parsed.duration ?? 0),
      currentPosition: normalizeTime(parsed.currentPosition ?? 0),
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
        playbackStatus: snapshot.playbackStatus,
        duration: normalizeTime(snapshot.duration),
        currentPosition: normalizeTime(snapshot.currentPosition),
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

  if (!state.currentItem) {
    clearPersistedPlayerSnapshot();
    return;
  }

  writePersistedPlayerSnapshot({
    currentItem: state.currentItem,
    playbackStatus: state.playbackStatus,
    duration: normalizeTime(state.duration),
    currentPosition: normalizeTime(state.currentPosition),
    error: state.error ?? null,
  });
}
