'use client';

import { Clock3 } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { usePlayerRuntime } from '@/features/player/hooks/usePlayerRuntime';
import { usePlayerState } from '@/features/player/hooks/usePlayerState';
import { useUpdateListeningHistory } from '../hooks/useUpdateListeningHistory';
import type { LibraryListeningHistoryItem } from '../types';
import { formatRelativePlayedAt } from '../utils/library-history-presentation';
import { LibraryEpisodeRow } from './LibraryEpisodeRow';
import { LibraryEmptyState } from './LibraryEmptyState';

export function LibraryHistorySection({ items }: { items: LibraryListeningHistoryItem[] }) {
  const playerRuntime = usePlayerRuntime();
  const playerState = usePlayerState();
  const updateListeningHistory = useUpdateListeningHistory();

  const activeEpisodeId = playerState.currentItem?.id;
  const syncListeningHistory = useCallback((episodeId: string, positionSeconds: number) => {
    updateListeningHistory.mutate({ episodeId, positionSeconds, completed: false });
  }, [updateListeningHistory]);

  const historyItems = useMemo(() => items, [items]);

  if (!historyItems.length) {
    return (
      <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-5" aria-labelledby="history-heading">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 id="history-heading" className="text-subheading">تاریخچه گوش دادن</h2>
            <p className="m-0 text-sm text-text-secondary">گوش دادن‌های اخیر شما در این بخش نمایش داده می‌شوند.</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-primary px-3 py-1.5 text-sm text-text-secondary">
            آماده برای لحظه‌های بعدی
          </span>
        </div>
        <LibraryEmptyState
          title="هنوز تاریخچه‌ای برای پخش وجود ندارد"
          description="وقتی اپیزودی را گوش بدهید، تاریخچه‌ی گوش دادن شما در اینجا ظاهر خواهد شد."
          eyebrow="شروع کن"
          icon={Clock3}
        />
      </section>
    );
  }

  return (
    <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-5" aria-labelledby="history-heading">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="m-0 text-sm font-medium text-accent">History</p>
          <h2 id="history-heading" className="text-subheading">Listening History</h2>
          <p className="m-0 text-sm text-text-secondary">اپیزودهایی که اخیراً گوش داده‌اید، دوباره در دسترس شما قرار گرفته‌اند.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-sm text-accent">
          <Clock3 className="h-4 w-4" aria-hidden="true" /> {historyItems.length} مورد اخیر
        </span>
      </div>
      <div className="space-y-3">
        {historyItems.map((item) => (
          <div key={item.id} className="space-y-3 rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-3 transition duration-200 hover:border-accent/30 hover:shadow-soft sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-secondary">آخرین بازپخش</p>
                {formatRelativePlayedAt(item.lastPlayedAt) ? (
                  <p className="m-0 text-xs text-text-secondary/90">{formatRelativePlayedAt(item.lastPlayedAt)}</p>
                ) : null}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface-secondary px-3 py-1.5 text-sm text-text-secondary">
                <Clock3 className="h-4 w-4" aria-hidden="true" /> {item.episode.podcast?.title ?? 'پادکست'}
              </div>
            </div>
            <LibraryEpisodeRow
              episode={item.episode}
              podcastTitle={item.episode.podcast?.title}
              positionSeconds={item.positionSeconds}
              durationSeconds={(item.episode as typeof item.episode & { duration?: number | null }).duration}
              isPlaying={activeEpisodeId === item.episode.id}
              onResume={() => {
                const startTime = Number.isFinite(item.positionSeconds ?? 0) ? Math.max(0, item.positionSeconds ?? 0) : 0;
                syncListeningHistory(item.episode.id, startTime);

                void playerRuntime.loadItem(
                  {
                    id: item.episode.id,
                    title: item.episode.title,
                    subtitle: item.episode.description,
                    audioUrl: item.episode.audioUrl,
                    artworkUrl: item.episode.podcast?.artworkUrl,
                    duration: typeof item.episode.duration === 'number' ? item.episode.duration : undefined,
                    podcastId: item.episode.podcast?.id,
                    sourceType: 'library',
                  },
                  { startTime },
                );
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
