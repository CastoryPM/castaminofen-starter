'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { usePlayerRuntime } from '../hooks/usePlayerRuntime';
import { usePlayerState } from '../hooks/usePlayerState';
import { formatTime } from '../utils/playerPresentation';

export function PlayerProgress() {
  const playerRuntime = usePlayerRuntime();
  const { currentPosition, duration, currentItem, playbackStatus } = usePlayerState();
  const [previewPosition, setPreviewPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const safePosition = Number.isFinite(currentPosition) ? Math.min(currentPosition, safeDuration) : 0;
  const disabled = !currentItem?.audioUrl || playbackStatus === 'loading';
  const displayedPosition = isSeeking ? previewPosition : safePosition;
  const progressRatio = safeDuration > 0 ? Math.min(1, Math.max(0, displayedPosition / safeDuration)) : 0;
  const bufferedRatio = playbackStatus === 'loading' ? 0.35 : Math.min(0.98, Math.max(progressRatio, 0.08));

  useEffect(() => {
    if (!isSeeking) {
      setPreviewPosition(safePosition);
    }
  }, [isSeeking, safePosition]);

  const commitPosition = (nextPosition: number) => {
    const clampedPosition = Math.min(safeDuration, Math.max(0, nextPosition));
    playerRuntime.setCurrentTime(clampedPosition);
    setPreviewPosition(clampedPosition);
  };

  return (
    <div className="flex flex-1 items-center gap-3 rounded-full bg-surface-secondary/70 px-3 py-2">
      <span className="min-w-[2.75rem] text-right text-[11px] font-medium text-text-secondary">{formatTime(displayedPosition)}</span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-primary/80">
        <div className={clsx('absolute inset-y-0 left-0 rounded-full bg-surface-hover transition-all duration-200', playbackStatus === 'loading' && 'animate-pulse')} style={{ width: `${bufferedRatio * 100}%` }} />
        <div className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-200" style={{ width: `${progressRatio * 100}%` }} />
        <input
          type="range"
          min={0}
          max={safeDuration}
          step={1}
          value={displayedPosition}
          onMouseDown={() => setIsSeeking(true)}
          onTouchStart={() => setIsSeeking(true)}
          onChange={(event) => {
            const nextPosition = Number(event.target.value);
            setPreviewPosition(nextPosition);
          }}
          onPointerUp={() => {
            setIsSeeking(false);
            commitPosition(displayedPosition);
          }}
          onBlur={() => {
            setIsSeeking(false);
            commitPosition(displayedPosition);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
          disabled={disabled}
          aria-label="Playback progress"
          aria-valuetext={`${formatTime(displayedPosition)} of ${formatTime(safeDuration)}`}
        />
      </div>
      <span className="min-w-[2.75rem] text-left text-[11px] font-medium text-text-secondary">{formatTime(safeDuration)}</span>
    </div>
  );
}
