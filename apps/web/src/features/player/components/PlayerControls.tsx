'use client';

import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Pause, Play, Repeat1, Repeat2, Shuffle, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayerRuntime } from '../hooks/usePlayerRuntime';
import { usePlayerState } from '../hooks/usePlayerState';

const controlButtonClassName = 'h-10 w-10 rounded-full p-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5';

export function PlayerControls() {
  const playerRuntime = usePlayerRuntime();
  const { currentItem, playbackStatus, isPlaying, queue, currentIndex, repeatMode, shuffleEnabled, toggleRepeat, toggleShuffle } = usePlayerState();

  const hasPlayableItem = Boolean(currentItem?.audioUrl);
  const canGoPrevious = currentIndex >= 0 && queue.length > 0 && Boolean(currentItem?.audioUrl) && (currentIndex > 0 || repeatMode === 'queue');
  const canGoNext = currentIndex >= 0 && queue.length > 0 && Boolean(currentItem?.audioUrl) && (repeatMode === 'queue' || shuffleEnabled || currentIndex < queue.length - 1);
  const isBusy = playbackStatus === 'loading';

  const handleTogglePlayback = async () => {
    if (!currentItem?.audioUrl) {
      return;
    }

    if (playbackStatus === 'playing') {
      playerRuntime.pause();
      return;
    }

    if (playbackStatus === 'paused') {
      await playerRuntime.play();
      return;
    }

    if (playbackStatus === 'loading') {
      return;
    }

    await playerRuntime.loadItem(currentItem);
  };

  const handleStop = () => {
    playerRuntime.stop();
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Playback controls">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={clsx(controlButtonClassName, 'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary')}
        onClick={() => void playerRuntime.previous()}
        disabled={!canGoPrevious || !hasPlayableItem}
        aria-label="پخش مورد قبلی"
        title="پخش مورد قبلی"
      >
        <ChevronLeft size={16} />
      </Button>
      <Button
        type="button"
        variant="primary"
        size="sm"
        className={clsx(controlButtonClassName, 'h-11 w-11', isBusy && 'animate-pulse')}
        onClick={() => void handleTogglePlayback()}
        disabled={!hasPlayableItem}
        aria-label={isPlaying ? 'توقف پخش' : 'شروع پخش'}
        aria-busy={isBusy}
        loading={isBusy}
        title={isPlaying ? 'توقف پخش' : 'شروع پخش'}
      >
        {!isBusy && (isPlaying ? <Pause size={16} /> : <Play size={16} />)}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={clsx(controlButtonClassName, 'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary')}
        onClick={handleStop}
        disabled={!hasPlayableItem || playbackStatus === 'idle'}
        aria-label="توقف پخش"
        title="توقف پخش"
      >
        <Square size={14} />
      </Button>
      <Button
        type="button"
        variant={shuffleEnabled ? 'secondary' : 'ghost'}
        size="sm"
        className={clsx(controlButtonClassName, shuffleEnabled ? 'border-accent/30 bg-accent/10 text-accent' : 'text-text-secondary')}
        onClick={() => toggleShuffle()}
        aria-label={`تصادفی ${shuffleEnabled ? 'روشن' : 'خاموش'}`}
        aria-pressed={shuffleEnabled}
        title={`تصادفی ${shuffleEnabled ? 'روشن' : 'خاموش'}`}
      >
        <Shuffle size={16} />
      </Button>
      <Button
        type="button"
        variant={repeatMode === 'off' ? 'ghost' : 'secondary'}
        size="sm"
        className={clsx(controlButtonClassName, repeatMode !== 'off' ? 'border-accent/30 bg-accent/10 text-accent' : 'text-text-secondary')}
        onClick={() => toggleRepeat()}
        aria-label={`تکرار ${repeatMode === 'one' ? 'یک آیتم' : repeatMode === 'queue' ? 'صف' : 'خاموش'}`}
        aria-pressed={repeatMode !== 'off'}
        title={`تکرار ${repeatMode === 'one' ? 'یک آیتم' : repeatMode === 'queue' ? 'صف' : 'خاموش'}`}
      >
        {repeatMode === 'one' ? <Repeat1 size={16} /> : <Repeat2 size={16} />}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={clsx(controlButtonClassName, 'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary')}
        onClick={() => void playerRuntime.next()}
        disabled={!canGoNext || !hasPlayableItem}
        aria-label="پخش مورد بعدی"
        title="پخش مورد بعدی"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
