'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Circle, Clock3, Layers3, MessageCircleMore, Pause, Play, Repeat1, Repeat2, Shuffle, SkipBack, SkipForward, Sparkles, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentArtwork } from '@/components/design-system/media/content-artwork';
import { DiscussionCard } from '@/components/design-system/social/discussion-card';
import { CommentPreview } from '@/components/design-system/social/comment-preview';
import { Reaction } from '@/components/design-system/social/reaction';
import { MediaCard } from '@/components/design-system/media/media-card';
import { MiniPlayer } from '@/components/design-system/player/mini-player';
import { TimelineMarker } from '@/components/design-system/player/timeline-marker';
import { Tag } from '@/components/design-system/common/tag';
import { usePlayerRuntime } from '../hooks/usePlayerRuntime';
import { usePlayerState } from '../hooks/usePlayerState';
import { formatTime, getArtworkFallback, getQueueSummary } from '../utils/playerPresentation';

type PanelTab = 'experience' | 'discussion' | 'memory' | 'queue';

type MarkerItem = {
  label: string;
  time: string;
  type: 'chapter' | 'comment' | 'bookmark';
};

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

  const markers = useMemo<MarkerItem[]>(() => [
    { label: 'معرفی', time: '00:00', type: 'chapter' },
    { label: 'ایده اصلی', time: '05:20', type: 'comment' },
    { label: 'نکته کلیدی', time: '18:40', type: 'bookmark' },
  ], []);

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
              <MediaCard title="Creator" subtitle="سارا رضایی" meta="دنبال می‌کنید">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary text-sm font-semibold text-text-primary">SR</div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">سارا رضایی</p>
                      <p className="text-xs text-text-secondary">پادکست و آموزش</p>
                    </div>
                  </div>
                  <Button type="button" variant="secondary" size="sm" className="rounded-full">دنبال کردن</Button>
                </div>
              </MediaCard>
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
                    <div className="mt-3 flex flex-wrap gap-2">
                      {markers.map((marker, index) => (
                        <TimelineMarker key={marker.label} label={`${marker.time} · ${marker.label}`} active={index === 1} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.4rem] border border-border/70 bg-surface-secondary/70 p-4">
                    <p className="text-sm font-semibold text-text-primary">رونویس</p>
                    <p className="mt-2 text-sm text-text-secondary">در این لحظه، معادل متن همزمان با پخش ارائه می‌شود و با کلیک روی سطرها، کاربر به زمان‌های مرتبط منتقل می‌شود.</p>
                    <div className="mt-3 space-y-2">
                      <button type="button" className="w-full rounded-[0.9rem] border border-border/70 bg-surface-card/80 px-3 py-2 text-right text-sm text-text-primary" onClick={() => handleSkip(320)}>
                        00:00 — معرفی و زمینه‌ی کلی
                      </button>
                      <button type="button" className="w-full rounded-[0.9rem] border border-border/70 bg-surface-card/80 px-3 py-2 text-right text-sm text-text-primary" onClick={() => handleSkip(320)}>
                        05:20 — توضیح ایده‌ی اصلی
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <DiscussionCard title="لحظه‌ی تعاملی" body="در این بخش، کاربران می‌توانند با موضوعات مهم در لحظه، تعامل داشته باشند." className="h-full">
                    <div className="flex flex-wrap gap-2">
                      <Reaction active>⚡ الهام‌گرفته</Reaction>
                      <Reaction>💡 ارزشمند</Reaction>
                      <Reaction>📝 یادداشت</Reaction>
                    </div>
                  </DiscussionCard>
                  <MediaCard title="پیشنهاد بعدی" subtitle="محتوای مرتبط با همین موضوع">
                    <div className="space-y-2">
                      <MiniPlayer title="آموزش تجربه‌محور" subtitle="سری جدید آموزش" actions={<Tag className="bg-surface-secondary text-text-secondary">مرتبط</Tag>} />
                      <MiniPlayer title="جلسه‌ی بحث و گفتگو" subtitle="برای دنبال کردن موضوع" actions={<Tag className="bg-surface-secondary text-text-secondary">Community</Tag>} />
                    </div>
                  </MediaCard>
                </div>
              </>
            ) : null}

            {activeTab === 'discussion' ? (
              <div className="space-y-3">
                <DiscussionCard title="بحث لحظه‌ای" body="23 نفر در این لحظه بحث کرده‌اند.">
                  <CommentPreview title="نظریه‌ی جذاب" body="این بخش واقعا نقطه‌ی عطفی برای درک موضوع بود." meta="24:35 • 8 دقیقه قبل" />
                  <CommentPreview title="یادداشت شخصی" body="به نظرم این مثال برای کارهای آینده خیلی کمک‌کننده است." meta="Chapter 3 • 2 دقیقه قبل" />
                </DiscussionCard>
                <div className="flex flex-wrap gap-2">
                  <Reaction active>👍 مفید</Reaction>
                  <Reaction>🔁 دوباره گوش می‌کنم</Reaction>
                  <Reaction>🎧 گوش دادن هم‌زمان</Reaction>
                </div>
              </div>
            ) : null}

            {activeTab === 'memory' ? (
              <div className="space-y-3">
                <MediaCard title="نکات مهم" subtitle="ذخیره‌ی لحظه‌ها برای بازگشت بعدی">
                  <div className="space-y-2">
                    <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">• نشانک برای لحظه‌ی 24:35</div>
                    <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">• هایلایت از جمله‌ی کلیدی</div>
                    <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">• یادداشت شخصی برای مرور بعدی</div>
                  </div>
                </MediaCard>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" size="sm" className="rounded-full">نشانک</Button>
                  <Button type="button" variant="secondary" size="sm" className="rounded-full">هایلایت</Button>
                  <Button type="button" variant="ghost" size="sm" className="rounded-full">یادداشت</Button>
                </div>
              </div>
            ) : null}

            {activeTab === 'queue' ? (
              <div className="space-y-3">
                <MediaCard title="صف بعدی" subtitle="آیتم‌های پخشِ بعدی">
                  <div className="space-y-2">
                    {queue.length > 0 ? queue.slice(currentIndex + 1).map((item, index) => (
                      <MiniPlayer key={item.id} title={item.title} subtitle={item.subtitle ?? 'اپیزود'} actions={<Tag className="bg-surface-secondary text-text-secondary">{index + 1}</Tag>} />
                    )) : <p className="rounded-[1rem] border border-dashed border-border/70 bg-surface-secondary/60 p-3 text-sm text-text-secondary">هیچ موردی در صف بعدی وجود ندارد.</p>}
                  </div>
                </MediaCard>
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
          <MediaCard title="محتوای مرتبط" subtitle="پیشنهاد برای ادامه‌ی تجربه">
            <div className="space-y-2">
              <MiniPlayer title="جلسه‌ی آموزشی" subtitle="دنباله‌ی همین موضوع" actions={<Tag className="bg-surface-secondary text-text-secondary">پیشنهاد</Tag>} />
              <MiniPlayer title="بحث جامعه" subtitle="گفت‌وگوی لحظه‌ای" actions={<Tag className="bg-surface-secondary text-text-secondary">Community</Tag>} />
            </div>
          </MediaCard>
        </aside>
      </div>
    </div>
  );
}
