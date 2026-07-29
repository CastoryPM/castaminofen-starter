'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNowStrict } from 'date-fns';
import { usePlayerRuntime } from '@/features/player/hooks/usePlayerRuntime';
import { mapEpisodeToPlayableItem } from '@/features/player/adapters/episodeToPlayable';
import { useFavorites } from '../hooks/useFavorites';
import { LibraryLoadingState } from './LibraryLoadingState';
import { LibraryErrorState } from './LibraryErrorState';
import { LibraryEmptyState } from './LibraryEmptyState';
import { Button } from '@/components/ui/button';
import { FavoriteActionButton } from './FavoriteActionButton';
import type { LibraryFavoriteResponse } from '@/lib/library';

export function LibraryFavoritesSection() {
  const query = useFavorites();
  const playerRuntime = usePlayerRuntime();

  if (query.isLoading) {
    return (
      <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-5 shadow-soft sm:p-6">
        <div className="space-y-4">
          <div className="h-5 w-40 rounded-full bg-surface-tertiary animate-pulse" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1].map((item) => (
              <div key={item} className="space-y-3 rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-4 shadow-sm">
                <div className="h-20 rounded-[1.5rem] bg-surface-tertiary animate-pulse" />
                <div className="h-4 w-3/4 rounded-full bg-surface-tertiary animate-pulse" />
                <div className="h-3 w-1/2 rounded-full bg-surface-tertiary animate-pulse" />
                <div className="h-9 w-24 rounded-full bg-surface-tertiary animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (query.isError) {
    return (
      <section className="rounded-[1.75rem] border border-error/40 bg-surface-primary/90 p-5 shadow-soft sm:p-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-text-primary">خطا در بارگذاری علاقه‌مندی‌ها</p>
          <p className="text-sm text-text-secondary">در دریافت اپیزودهای ذخیره‌شده مشکلی رخ داد. لطفاً دوباره تلاش کنید.</p>
          <div>
            <Button variant="secondary" onClick={() => void query.refetch()}>
              تلاش مجدد
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const items: LibraryFavoriteResponse[] = query.data ?? [];

  if (!items.length) {
    return (
      <LibraryEmptyState
        eyebrow="علاقه‌مندی‌ها"
        title="علاقه‌مندی‌های شما در انتظارند"
        description="اپیزودهایی که دوست دارید را ذخیره کنید و هر زمان بازگردید."
        actionLabel="کاوش در پادکست‌ها"
      />
    );
  }

  return (
    <section id="favorites" aria-labelledby="favorites-heading" className="space-y-4">
      <div className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">علاقه‌مندی‌ها</p>
            <h2 id="favorites-heading" className="text-subheading">اپیزودهای ذخیره‌شده</h2>
            <p className="text-sm text-text-secondary">اپیزودهایی که ذخیره کرده‌اید برای بازگشت سریع.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="group flex flex-col gap-4 rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-4 shadow-sm transition-all duration-200 hover:border-accent/30 hover:shadow-soft sm:flex-row sm:items-center">
            <div className="relative h-20 w-full overflow-hidden rounded-[1.5rem] bg-surface-secondary sm:h-24 sm:w-24">
              {item.episode.podcast?.artworkUrl ? (
                <Image
                  src={item.episode.podcast.artworkUrl}
                  alt={item.episode.title}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface-secondary text-sm font-semibold text-accent">
                  {item.episode.title.trim().charAt(0) || 'E'}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-text-primary line-clamp-2">{item.episode.title}</h3>
              <p className="mt-1 text-xs text-text-secondary line-clamp-1">{item.episode.podcast?.title ?? 'Podcast'}</p>
              <p className="mt-2 text-xs text-text-secondary">Saved {formatDistanceToNowStrict(new Date(item.savedAt))} ago</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:flex-col sm:items-end">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => void playerRuntime.loadItem(mapEpisodeToPlayableItem(item.episode))}
                aria-label={`Play ${item.episode.title}`}
              >
                <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                Play
              </Button>
              <FavoriteActionButton episodeId={item.episodeId} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
