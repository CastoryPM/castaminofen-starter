'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ListMusic, Play, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MiniPlayer } from '@/components/design-system/player/mini-player';
import { Tag } from '@/components/design-system/common/tag';
import { PlayerControls } from './PlayerControls';
import { PlayerInfo } from './PlayerInfo';
import { PlayerProgress } from './PlayerProgress';
import { PlayerVolume } from './PlayerVolume';
import { usePlayerRuntime } from '../hooks/usePlayerRuntime';
import { usePlayerState } from '../hooks/usePlayerState';
import { formatTime, getArtworkFallback, getQueueDisplayItems } from '../utils/playerPresentation';

export function PlayerBar() {
  const playerRuntime = usePlayerRuntime();
  const { currentItem, playbackStatus, error, queue, currentIndex, repeatMode, shuffleEnabled, currentPosition } = usePlayerState();
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const queueDisplay = useMemo(() => getQueueDisplayItems(queue, currentIndex), [queue, currentIndex]);
  const queueCountLabel = queue.length > 1 ? `${queue.length - (currentIndex >= 0 ? 1 : 0)} مورد دیگر در صف` : 'صف خالی';
  const resumeHint = currentItem && currentPosition > 0 && ['loading', 'paused'].includes(playbackStatus)
    ? `ادامه از ${formatTime(currentPosition)}`
    : null;
  const canRetry = Boolean(currentItem?.audioUrl) && Boolean(error) && playbackStatus !== 'loading';
  const queueDialogId = 'player-queue-panel';

  useEffect(() => {
    if (!isQueueOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsQueueOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isQueueOpen]);

  const handleQueueAction = () => {
    if (currentItem) {
      playerRuntime.appendToQueue(currentItem);
    }
  };

  const handleRetryPlayback = async () => {
    if (!currentItem) {
      return;
    }

    await playerRuntime.loadItem(currentItem, { startTime: currentPosition });
  };

  return (
    <div className="rounded-[1.75rem] border border-border/80 bg-gradient-to-br from-surface-secondary/95 to-surface-card/90 p-3 shadow-soft backdrop-blur sm:p-4 lg:p-5">
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
          {resumeHint ? <p className="mt-2 text-xs text-text-secondary">{resumeHint}</p> : null}
          {error ? (
            <div className="mt-2 flex flex-wrap items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-2" role="alert">
              <p className="text-xs text-accent">{error}</p>
              {canRetry ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="rounded-full px-3 py-1 text-[11px]"
                  onClick={() => void handleRetryPlayback()}
                  aria-label="تلاش مجدد برای پخش"
                >
                  تلاش مجدد
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 xl:min-w-[28rem] xl:flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PlayerControls />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 rounded-full border border-border/60 bg-surface-card/70 px-3 py-2 text-xs text-text-secondary focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary"
                onClick={() => setIsQueueOpen((open) => !open)}
                aria-label={isQueueOpen ? 'بستن صف پخش' : 'باز کردن صف پخش'}
                aria-expanded={isQueueOpen}
                aria-controls={queueDialogId}
                title={isQueueOpen ? 'بستن صف پخش' : 'باز کردن صف پخش'}
              >
                <ListMusic size={14} />
                <span>{queue.length > 0 ? queueCountLabel : 'صف پخش'}</span>
              </Button>
              <div className="hidden sm:block">
                <PlayerVolume />
              </div>
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

      {isQueueOpen ? (
        <div id={queueDialogId} role="dialog" aria-modal="true" aria-labelledby="player-queue-title" className="mt-4 rounded-[1.25rem] border border-border/70 bg-surface-card/90 p-4 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p id="player-queue-title" className="text-sm font-semibold text-text-primary">صف پخش</p>
              <p className="text-xs text-text-secondary">
                {queue.length > 0 ? `${queue.length} مورد در صف` : 'هیچ اپیزودی برای پخش بعدی وجود ندارد.'}
              </p>
            </div>
            <Button
              type="button"
              ref={closeButtonRef}
              variant="ghost"
              size="sm"
              className="rounded-full p-2"
              onClick={() => setIsQueueOpen(false)}
              aria-label="بستن صف پخش"
            >
              <X size={14} />
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {queueDisplay.currentItem ? (
              <MiniPlayer
                title={queueDisplay.currentItem.title}
                subtitle={queueDisplay.currentItem.subtitle ?? 'اپیزود'}
                className="border-accent/20 bg-accent/10"
                actions={<Tag className="border-accent/20 bg-accent/10 text-accent">در حال پخش</Tag>}
              />
            ) : (
              <div className="rounded-[1rem] border border-dashed border-border/70 bg-surface-secondary/60 p-4 text-sm text-text-secondary">
                هیچ اپیزودی در حال پخش نیست.
              </div>
            )}

            <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/50 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-text-primary">بعدی</p>
                <p className="text-xs text-text-secondary">
                  {queueDisplay.upNext.length > 0 ? `${queueDisplay.upNext.length} مورد` : 'هیچ موردی در صف بعدی نیست'}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={handleQueueAction}
                  disabled={!currentItem}
                  aria-label="افزودن به صف پخش"
                >
                  <span className="flex items-center gap-2">
                    <Plus size={14} />
                    افزودن به صف
                  </span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => playerRuntime.clearQueue()}
                  disabled={queue.length === 0}
                  aria-label="پاک کردن صف پخش"
                >
                  پاک کردن صف
                </Button>
              </div>
              {queueDisplay.upNext.length > 0 ? (
                <ul className="mt-3 space-y-2" aria-label="Queue items">
                  {queueDisplay.upNext.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 rounded-[0.85rem] bg-surface-card/70 p-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-tertiary text-[11px] font-semibold text-text-secondary">
                        {item.position}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-text-primary">{item.title}</p>
                        <p className="truncate text-xs text-text-secondary">{item.subtitle ?? 'اپیزود'}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="rounded-full p-2"
                          onClick={() => void playerRuntime.loadItem(item)}
                          aria-label={`پخش ${item.title}`}
                          title={`پخش ${item.title}`}
                        >
                          <Play size={14} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="rounded-full p-2"
                          onClick={() => playerRuntime.removeFromQueue(item.id)}
                          aria-label={`حذف ${item.title}`}
                          title={`حذف ${item.title}`}
                          data-testid={`queue-remove-${item.id}`}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-3 rounded-[0.85rem] border border-dashed border-border/60 bg-surface-card/50 p-3 text-sm text-text-secondary">
                  برای اضافه کردن موارد بعدی، اپیزودی را در صف پخش قرار دهید.
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Tag className="border-accent/20 bg-accent/10 text-accent">
                {repeatMode === 'one' ? 'تکرار: یک مورد' : repeatMode === 'queue' ? 'تکرار: صف' : 'تکرار: خاموش'}
              </Tag>
              <Tag className="border-accent/20 bg-accent/10 text-accent">
                {shuffleEnabled ? 'تصادفی: روشن' : 'تصادفی: خاموش'}
              </Tag>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
