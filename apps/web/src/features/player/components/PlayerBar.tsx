'use client';

import { PlayerControls } from './PlayerControls';
import { PlayerInfo } from './PlayerInfo';
import { PlayerProgress } from './PlayerProgress';
import { PlayerVolume } from './PlayerVolume';
import { usePlayerState } from '../hooks/usePlayerState';

export function PlayerBar() {
  const { currentItem, playbackStatus, error, queue } = usePlayerState();

  return (
    <div className="rounded-[1.5rem] border border-border/80 bg-gradient-to-br from-surface-secondary/95 to-surface-card/90 p-3 shadow-soft backdrop-blur sm:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="min-w-0 flex-1">
          <PlayerInfo />
          {!currentItem && !error && queue.length === 0 ? (
            <p className="mt-2 text-xs text-text-secondary">برای شروع، اپیزودی را انتخاب کنید.</p>
          ) : null}
          {!currentItem && !error && queue.length > 0 ? (
            <p className="mt-2 text-xs text-text-secondary">صف انتظار آماده است؛ برای شروع پخش، دکمه Play را بزنید.</p>
          ) : null}
          {playbackStatus === 'loading' ? <p className="mt-2 text-xs text-text-secondary">در حال آماده‌سازی پخش…</p> : null}
          {error ? <p className="mt-2 text-xs text-accent" role="alert">{error}</p> : null}
        </div>
        <div className="flex flex-col gap-3 xl:min-w-[28rem] xl:flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PlayerControls />
            <div className="hidden sm:block">
              <PlayerVolume />
            </div>
          </div>
          <div className="hidden md:block">
            <PlayerProgress />
          </div>
        </div>
      </div>
      <div className="mt-3 md:hidden">
        <PlayerProgress />
      </div>
    </div>
  );
}
