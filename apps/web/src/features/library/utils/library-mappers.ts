import type { LibraryListeningHistoryItem, LibrarySubscription } from '../types';

export function toLibrarySubscriptionList(items: LibrarySubscription[]) {
  return items;
}

export function toContinueListeningList(items: LibraryListeningHistoryItem[]) {
  return items;
}

export function formatDurationLabel(seconds?: number | null) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds ?? 0)) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function formatProgressSummary(positionSeconds?: number | null, durationSeconds?: number | null) {
  const elapsedLabel = formatDurationLabel(positionSeconds);

  if (!Number.isFinite(durationSeconds) || (durationSeconds ?? 0) <= 0) {
    return elapsedLabel;
  }

  const remainingLabel = formatDurationLabel(Math.max(0, Math.floor(durationSeconds) - Math.floor(positionSeconds ?? 0)));
  return `${elapsedLabel} / ${formatDurationLabel(durationSeconds)} · ${remainingLabel} باقی مانده`;
}
