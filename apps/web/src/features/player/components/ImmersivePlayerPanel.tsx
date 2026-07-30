'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Circle, Clock3, Layers3, MessageCircleMore, Pause, Play, Repeat1, Repeat2, Shuffle, SkipBack, SkipForward, Sparkles, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentArtwork } from '@/components/design-system/media/content-artwork';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import { usePlayerRuntime } from '../hooks/usePlayerRuntime';
import { usePlayerState } from '../hooks/usePlayerState';
import { formatTime, getArtworkFallback, getQueueSummary } from '../utils/playerPresentation';
import { TimelineMarkers, type TimelineMarkerItem } from './TimelineMarkers';
import { DiscussionThreadPanel } from './DiscussionThreadPanel';
import { BookmarkPanel } from './BookmarkPanel';
import { MemoryPanel } from './MemoryPanel';
import { TranscriptPanel } from './TranscriptPanel';
import { QueuePanel } from './QueuePanel';
import { CreatorPanel } from './CreatorPanel';
import { RelatedContentPanel } from './RelatedContentPanel';
import { getPlayerExperienceViewModel } from '../data/mockPlayerExperience';

type PanelTab = 'experience' | 'discussion' | 'memory' | 'queue';

type MarkerItem = TimelineMarkerItem;

const tabs: Array<{ id: PanelTab; label: string }> = [
  { id: 'experience', label: 'پخش تعاملی' },
  { id: 'discussion', label: 'بحث لحظه‌ای' },
  { id: 'memory', label: 'یادداشت شخصی' },
  { id: 'queue', label: 'صف بعدی' },
];

export function ImmersivePlayerPanel({ onClose }: { onClose: () => void }) {
  const playerRuntime = usePlayerRuntime();
  const { currentItem, playbackStatus, error, queue, currentIndex, repeatMode, shuffleEnabled, currentPosition, duration, isPlaying, toggleRepeat, toggleShuffle } = usePlayerState();
  const [activeTab, setActiveTab] = useState<PanelTab>('experience');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const queueSummary = queue.length > 0 ? getQueueSummary({ queueLength: queue.length, currentIndex, repeatMode, shuffleEnabled }) : 'صف خالی';
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentPosition / duration) * 100)) : 0;
  const isBusy = playbackStatus === 'loading';

  const [selectedMarkerId, setSelectedMarkerId] = useState('idea');

  const markers = useMemo<MarkerItem[]>(() => getPlayerExperienceViewModel(currentPosition).markers, [currentPosition]);

  const handleSkip = (deltaSeconds: number) => {
    const nextPosition = Math.max(0, (currentPosition || 0) + deltaSeconds);
    playerRuntime.setCurrentTime(nextPosition);
  };

  const handleTogglePlayback = async () => {
    if (!currentItem) {
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

  const handleCycleSpeed = () => {
    const nextSpeed = playbackSpeed >= 2 ? 1 : playbackSpeed + 0.25;
    setPlaybackSpeed(Number(nextSpeed.toFixed(2)) as 1 | 1.25 | 1.5 | 1.75 | 2);
  };

  const currentTitle = currentItem?.title ?? 'هیچ محتوایی در حال پخش نیست';
  const currentSubtitle = currentItem?.subtitle ?? 'اپیزود یا محتوای منتخب را برای ورود به تجربه‌ی تعاملی انتخاب کنید';
  const canRetry = Boolean(currentItem?.audioUrl) && Boolean(error) && playbackStatus !== 'loading';

  return (
    <div className="mt-4 rounded-[2rem] border border-border/80 bg-surface-card/95 p-3 shadow-2xl shadow-black/10 backdrop-blur sm:p-4 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row">
        <section className="flex-1 rounded-[1.75rem] border border-border/70 bg-gradient-to-br from-surface-secondary/90 to-surface-card/90 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Immersive Player</p>
              <h2 className="mt-1 text-xl font-semibold text-text-primary">پخش تعاملی</h2>
            </div>
            <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={onClose} aria-label="بستن پخش تعاملی">
              <X size={16} />
            </Button>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-[1.6rem] border border-border/70 bg-surface-card/80 p-4 shadow-soft">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="border-accent/20 bg-accent/10 text-accent">{playbackStatus === 'playing' ? 'در حال پخش' : playbackStatus === 'paused' ? 'متوقف' : playbackStatus === 'loading' ? 'در حال آماده‌سازی' : 'آماده'}</Tag>
                <Tag className="bg-surface-secondary text-text-secondary">{queueSummary}</Tag>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-36 w-36 shrink-0 sm:h-44 sm:w-44">
                  <ContentArtwork src={currentItem?.artworkUrl} alt={currentTitle} fallback={getArtworkFallback(currentItem)} className="h-full w-full rounded-[1.4rem]" />
                  {isBusy ? <div className="absolute inset-0 flex items-center justify-center rounded-[1.4rem] bg-surface-card/70"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text-primary">{currentTitle}</p>
                  <p className="mt-1 text-sm text-text-secondary">{currentSubtitle}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Tag className="bg-surface-secondary text-text-secondary">{currentItem?.podcastId ? 'پادکست' : 'محتوای صوتی'}</Tag>
                    <Tag className="bg-surface-secondary text-text-secondary">{formatTime(currentPosition)} / {formatTime(duration)}</Tag>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={() => void playerRuntime.previous()} aria-label="پخش مورد قبلی">
                      <SkipBack size={14} />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={() => void handleTogglePlayback()} aria-label="تغییر وضعیت پخش">
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={() => void playerRuntime.next()} aria-label="پخش مورد بعدی">
                      <SkipForward size={14} />
                    </Button>
                    <Button type="button" variant="secondary" size="sm" className="rounded-full" onClick={() => handleSkip(-30)} aria-label="پرش ۳۰ ثانیه به عقب">
                      <SkipBack size={14} />
                      <span className="mr-2">-30s</span>
                    </Button>
                    <Button type="button" variant="secondary" size="sm" className="rounded-full" onClick={() => handleSkip(30)} aria-label="پرش ۳۰ ثانیه به جلو">
                      <SkipForward size={14} />
                      <span className="mr-2">+30s</span>
                    </Button>
                    <Button type="button" variant={shuffleEnabled ? 'secondary' : 'ghost'} size="sm" className="rounded-full" onClick={() => toggleShuffle()} aria-label="تغییر حالت تصادفی">
                      <Shuffle size={14} />
                    </Button>
                    <Button type="button" variant={repeatMode === 'off' ? 'ghost' : 'secondary'} size="sm" className="rounded-full" onClick={() => toggleRepeat()} aria-label="تغییر حالت تکرار">
                      {repeatMode === 'one' ? <Repeat1 size={14} /> : <Repeat2 size={14} />}
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={handleCycleSpeed} aria-label="تغییر سرعت پخش">
                      <Volume2 size={14} />
                      <span className="mr-2">{playbackSpeed.toFixed(2)}x</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span>{formatTime(currentPosition)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent to-sky-500 transition-all duration-200" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <MediaCard title="اطلاعات محتوا" subtitle="در این بخش، تجربه‌ی پخش به‌صورت تعاملی و روایت‌محور نمایش داده می‌شود" meta="Premium" className="h-full">
                <div className="space-y-2 text-sm text-text-secondary">
                  <p className="flex items-center gap-2"><BookOpen size={14} className="text-accent" /> تجربه‌ی آموزشی و اجتماعی در یک فضای واحد</p>
                  <p className="flex items-center gap-2"><Sparkles size={14} className="text-accent" /> لحظه‌های مهم، یادداشت‌ها و بحث‌های مرتبط</p>
                  <p className="flex items-center gap-2"><Layers3 size={14} className="text-accent" /> پشتیبانی از حالت صوتی، ویدیویی و آموزش</p>
                </div>
              </MediaCard>
              <CreatorPanel />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                type="button"
                variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-full"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            {activeTab === 'experience' ? (
              <>
                <div className="space-y-3">
                  <div className="rounded-[1.4rem] border border-border/70 bg-surface-secondary/70 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-text-primary">نقشه‌ی زمان</p>
                      <Tag className="bg-surface-card text-text-secondary">{formatTime(currentPosition)}</Tag>
                    </div>
                    <div className="mt-3">
                      <TimelineMarkers markers={markers} selectedMarkerId={selectedMarkerId} onSelectMarker={(marker) => setSelectedMarkerId(marker.id)} />
                    </div>
                  </div>
                  <TranscriptPanel currentTimestamp={currentPosition} onSeek={handleSkip} />
                </div>
                <div className="space-y-3">
                  <DiscussionThreadPanel currentTimestamp={currentPosition} />
                  <RelatedContentPanel />
                </div>
              </>
            ) : null}

            {activeTab === 'discussion' ? (
              <div className="space-y-3">
                <DiscussionThreadPanel currentTimestamp={currentPosition} />
                <BookmarkPanel />
              </div>
            ) : null}

            {activeTab === 'memory' ? (
              <div className="space-y-3">
                <MemoryPanel />
                <BookmarkPanel />
              </div>
            ) : null}

            {activeTab === 'queue' ? (
              <div className="space-y-3">
                <QueuePanel
                  queue={queue}
                  currentItem={currentItem}
                  currentIndex={currentIndex}
                  onPlay={(item) => void playerRuntime.loadItem(item)}
                  onRemove={(itemId) => playerRuntime.removeFromQueue(itemId)}
                />
                {error ? <div className="rounded-[1rem] border border-accent/20 bg-accent/10 p-3 text-sm text-accent">{error}</div> : null}
              </div>
            ) : null}
          </div>
        </section>

        <aside className="w-full space-y-3 lg:w-[320px]">
          <MediaCard title="وضعیت فعلی" subtitle="پخش و تجربه‌ی لحظه‌ای">
            <div className="space-y-2 text-sm text-text-secondary">
              <p className="flex items-center gap-2"><Clock3 size={14} className="text-accent" /> {formatTime(currentPosition)} / {formatTime(duration)}</p>
              <p className="flex items-center gap-2"><MessageCircleMore size={14} className="text-accent" /> 23 نفر در این لحظه بحث کردند</p>
              <p className="flex items-center gap-2"><Circle size={14} className="text-accent" /> حالت {playbackSpeed.toFixed(2)}x فعال است</p>
            </div>
          </MediaCard>
          {canRetry ? (
            <Button type="button" variant="secondary" size="sm" className="w-full rounded-full" onClick={() => void playerRuntime.loadItem(currentItem!, { startTime: currentPosition })}>
              تلاش مجدد برای پخش
            </Button>
          ) : null}
          <RelatedContentPanel />
        </aside>
      </div>
    </div>
  );
}
