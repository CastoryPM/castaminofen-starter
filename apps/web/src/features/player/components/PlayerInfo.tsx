'use client';

import { LoaderCircle } from 'lucide-react';
import { usePlayerState } from '../hooks/usePlayerState';
import { getArtworkFallback, getPlaybackStateLabel, getQueueSummary } from '../utils/playerPresentation';

export function PlayerInfo() {
  const { currentItem, playbackStatus, error, queue, currentIndex, repeatMode, shuffleEnabled } = usePlayerState();

  const title = currentItem?.title ?? 'No active playback';
  const subtitle = currentItem?.subtitle
    ?? (playbackStatus === 'loading' ? 'Preparing audio…' : playbackStatus === 'idle' ? 'Choose an episode to start listening.' : 'Playback available');
  const isBusy = playbackStatus === 'loading';
  const statusLabel = getPlaybackStateLabel(playbackStatus);
  const queueHint = queue.length > 0 ? getQueueSummary({ queueLength: queue.length, currentIndex, repeatMode, shuffleEnabled }) : null;

  return (
    <div className="flex min-w-0 items-start gap-3 rounded-[1.25rem] border border-border/70 bg-surface-card/70 p-3 shadow-sm">
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-border/60 bg-surface-tertiary shadow-inner">
        {currentItem?.artworkUrl ? (
          <img src={currentItem.artworkUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">{getArtworkFallback(currentItem)}</span>
        )}
        {isBusy ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-card/70">
            <LoaderCircle className="h-5 w-5 animate-spin text-accent" aria-hidden="true" />
          </div>
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-text-primary">{title}</p>
          <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">{statusLabel}</span>
        </div>
        <p className="mt-1 truncate text-xs text-text-secondary">{subtitle}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
          {queueHint ? <span className="rounded-full bg-surface-secondary px-2 py-0.5">{queueHint}</span> : null}
          {currentItem?.podcastId ? <span className="rounded-full bg-surface-secondary px-2 py-0.5">پادکست</span> : null}
        </div>
        {error ? <p className="mt-2 truncate text-xs text-accent" role="alert">{error}</p> : null}
      </div>
    </div>
  );
}
