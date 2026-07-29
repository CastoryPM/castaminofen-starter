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

  if (typeof durationSeconds !== 'number' || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return elapsedLabel;
  }

  const safeDurationSeconds = Math.max(0, Math.floor(durationSeconds));
  const safePositionSeconds = typeof positionSeconds === 'number' && Number.isFinite(positionSeconds)
    ? Math.max(0, Math.floor(positionSeconds))
    : 0;
  const remainingLabel = formatDurationLabel(Math.max(0, safeDurationSeconds - safePositionSeconds));

  return `${elapsedLabel} / ${formatDurationLabel(safeDurationSeconds)} · ${remainingLabel} باقی مانده`;
}
