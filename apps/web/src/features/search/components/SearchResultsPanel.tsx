'use client';

import Link from 'next/link';
import { Play, Plus } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { LoadingState } from '@/components/ui/loading-state';
import { MediaCard } from '@/components/design-system/media/media-card';
import { ContentArtwork } from '@/components/design-system/media/content-artwork';
import { Tag } from '@/components/design-system/common/tag';
import { usePlayerRuntime } from '@/features/player';
import { mapEpisodeToPlayableItem } from '@/features/player/adapters/episodeToPlayable';
import { getPodcastOwnerLabel } from '@/features/podcasts/utils/podcastPresentation';
import type { Episode, Podcast } from '@/lib/types';
import { rankEpisodeResults, rankPodcastResults } from '../utils/searchRanking';
import { useSearchResults } from '../hooks/useSearchResults';

type SearchResultsPanelProps = {
  query: string;
  page?: number;
};

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="space-y-3">
        <div className="h-6 w-32 animate-pulse rounded-full bg-surface-secondary" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-[1.5rem] border border-border/70 bg-surface-secondary/70" />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-6 w-28 animate-pulse rounded-full bg-surface-secondary" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-20 animate-pulse rounded-[1.25rem] border border-border/70 bg-surface-secondary/70" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SearchResultsPanel({ query, page }: SearchResultsPanelProps) {
  const debouncedQuery = query.trim();
  const result = useSearchResults(debouncedQuery);
  const playerRuntime = usePlayerRuntime();
  const pageLabel = typeof page === 'number' && page > 1 ? ` · صفحه ${page}` : '';

  const podcasts = result.data?.podcasts.data ?? [];
  const episodes = result.data?.episodes ?? [];
  const rankedPodcasts = useMemo(() => rankPodcastResults(podcasts, debouncedQuery), [podcasts, debouncedQuery]);
  const rankedEpisodes = useMemo(() => rankEpisodeResults(episodes, debouncedQuery), [episodes, debouncedQuery]);

  const handlePlayEpisode = async (episode: Episode) => {
    if (!episode.audioUrl) {
      return;
    }

    await playerRuntime.loadItem(mapEpisodeToPlayableItem(episode));
  };

  const handleAddToQueue = (episode: Episode) => {
    playerRuntime.appendToQueue(mapEpisodeToPlayableItem(episode));
  };

  if (result.isLoading) {
    return <SearchResultsSkeleton />;
  }

  if (result.isError) {
    return <ErrorState title="جستجو با مشکل مواجه شد" message={result.error?.message ?? 'امکان انجام جستجو در این لحظه وجود ندارد.'} description="لطفاً دوباره تلاش کنید." />;
  }

  if (!debouncedQuery) {
    return (
      <div className="space-y-4">
        <div className="rounded-[1.6rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-accent">پیشنهادهای کشف سریع</p>
              <h2 className="text-subheading">شناخت مسیر بعدی در یک نگاه</h2>
              <p className="text-sm text-text-secondary">جستجو در پادکست، اپیزود، سازنده و موضوعات مورد علاقه‌تان را از همین صفحه شروع کنید.</p>
            </div>
            <Tag className="border-accent/20 bg-accent/10 text-accent">Discovery Ready</Tag>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              { title: 'پادکست', description: 'کشف مسیرهای مورد علاقه و مجموعه‌های شخصی' },
              { title: 'اپیزود', description: 'بازگشت به لحظه‌های نیمه‌تمام و ادامه پخش' },
              { title: 'سازنده', description: 'شناخت هویت‌های فعال و جامعه‌ی مرتبط' },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.2rem] border border-border/70 bg-surface-card/80 p-3">
                <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <EmptyState
          title="جستجو را شروع کنید"
          description="برای یافتن پادکست‌ها و اپیزودهای موجود، عبارتی را در کادر جستجو وارد کنید."
        />
      </div>
    );
  }

  if (!rankedPodcasts.length && !rankedEpisodes.length) {
    return (
      <EmptyState
        title="نتیجه‌ای یافت نشد"
        description={`برای «${debouncedQuery}» هیچ نتیجه‌ای در پادکست‌ها یا اپیزودهای موجود پیدا نشد.`}
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-subheading">پادکست‌ها</h2>
          <span className="text-sm text-text-secondary">{rankedPodcasts.length} نتیجه{pageLabel}</span>
        </div>
        {rankedPodcasts.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {rankedPodcasts.map((podcast: Podcast) => (
              <MediaCard key={podcast.id} title={podcast.title} subtitle={getPodcastOwnerLabel(podcast)} meta={<Tag>پادکست</Tag>} className="min-h-full">
                <div className="flex items-start gap-3">
                  <ContentArtwork src={podcast.artworkUrl} alt={`${podcast.title} artwork`} fallback="پ" className="h-16 w-16 shrink-0 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <p className="line-clamp-2 text-sm text-text-secondary">{podcast.description || 'توضیحی برای این پادکست ثبت نشده است.'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/podcasts/${podcast.id}`} className="inline-flex w-full">
                    <Button type="button" variant="secondary" className="w-full justify-center">
                      مشاهده پادکست
                    </Button>
                  </Link>
                </div>
              </MediaCard>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">برای این عبارت پادکست منطبق یافت نشد.</p>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-subheading">اپیزودها</h2>
          <span className="text-sm text-text-secondary">{rankedEpisodes.length} نتیجه{pageLabel}</span>
        </div>
        {rankedEpisodes.length ? (
          <div className="space-y-3">
            {rankedEpisodes.map((episode: Episode) => (
              <MediaCard key={episode.id} title={episode.title} subtitle={episode.podcast?.title ?? 'پادکست'} meta={<Tag>{episode.publishedAt ? 'منتشر شده' : 'پخش مستقیم'}</Tag>} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-2">
                  <p className="text-sm text-text-secondary">{episode.publishedAt ? `منتشر شده ${new Date(episode.publishedAt).toLocaleDateString('fa-IR')}` : 'پخش مستقیم'}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => void handlePlayEpisode(episode)}
                    disabled={!episode.audioUrl}
                    className="min-h-[2.75rem]"
                    aria-label={`پخش اپیزود ${episode.title}`}
                  >
                    <span className="flex items-center gap-2">
                      <Play className="h-4 w-4" aria-hidden="true" />
                      {episode.audioUrl ? 'پخش' : 'در دسترس نیست'}
                    </span>
                  </Button>
                  <Button type="button" variant="ghost" className="min-h-[2.75rem]" onClick={() => handleAddToQueue(episode)} aria-label={`افزودن اپیزود ${episode.title} به صف`}>
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      افزودن به صف
                    </span>
                  </Button>
                  <Link href={`/episodes/${episode.id}`} className="inline-flex">
                    <Button type="button" variant="secondary" className="min-h-[2.75rem] justify-center">
                      مشاهده اپیزود
                    </Button>
                  </Link>
                </div>
              </MediaCard>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">برای این عبارت اپیزود منطبق یافت نشد.</p>
        )}
      </section>
    </div>
  );
}
