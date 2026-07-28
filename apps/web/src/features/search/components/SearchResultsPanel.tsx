'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { useSearchResults } from '../hooks/useSearchResults';
import { getPodcastOwnerLabel } from '@/features/podcasts/utils/podcastPresentation';
import type { Episode, Podcast } from '@/lib/types';

type SearchResultsPanelProps = {
  query: string;
};

export function SearchResultsPanel({ query }: SearchResultsPanelProps) {
  const debouncedQuery = query.trim();
  const result = useSearchResults(debouncedQuery);

  if (result.isLoading) {
    return <LoadingState title="در حال جستجو" message="در حال بررسی نتایج برای عبارت موردنظر هستیم…" />;
  }

  if (result.isError) {
    return <ErrorState title="جستجو با مشکل مواجه شد" message={result.error?.message ?? 'امکان انجام جستجو در این لحظه وجود ندارد.'} description="لطفاً دوباره تلاش کنید." />;
  }

  const podcasts = result.data?.podcasts.data ?? [];
  const episodes = result.data?.episodes ?? [];

  if (!debouncedQuery) {
    return (
      <EmptyState
        title="جستجو را شروع کنید"
        description="برای یافتن پادکست‌ها و اپیزودهای موجود، عبارتی را در کادر جستجو وارد کنید."
      />
    );
  }

  if (!podcasts.length && !episodes.length) {
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
        <div className="flex items-center justify-between">
          <h2 className="text-subheading">پادکست‌ها</h2>
          <span className="text-sm text-text-secondary">{podcasts.length} نتیجه</span>
        </div>
        {podcasts.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {podcasts.map((podcast: Podcast) => (
              <div key={podcast.id} className="rounded-2xl border border-border/80 bg-surface-primary p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  {podcast.artworkUrl ? (
                    <Image src={podcast.artworkUrl} alt={`${podcast.title} artwork`} width={80} height={80} className="h-16 w-16 rounded-xl object-cover" unoptimized />
                  ) : null}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-base font-semibold text-text-primary">{podcast.title}</h3>
                    <p className="text-sm text-text-secondary">{getPodcastOwnerLabel(podcast)}</p>
                    <p className="text-sm text-text-secondary line-clamp-2">{podcast.description || 'توضیحی برای این پادکست ثبت نشده است.'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/podcasts/${podcast.id}`} className="button button-secondary w-full justify-center">
                    مشاهده پادکست
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">برای این عبارت پادکست منطبق یافت نشد.</p>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-subheading">اپیزودها</h2>
          <span className="text-sm text-text-secondary">{episodes.length} نتیجه</span>
        </div>
        {episodes.length ? (
          <div className="space-y-3">
            {episodes.map((episode: Episode) => (
              <Link key={episode.id} href={`/episodes/${episode.id}`} className="flex items-center justify-between rounded-2xl border border-border/80 bg-surface-primary px-4 py-3 transition hover:border-primary/60 hover:bg-surface-secondary">
                <div>
                  <h3 className="font-semibold text-text-primary">{episode.title}</h3>
                  <p className="text-sm text-text-secondary">{episode.podcast?.title ?? 'پادکست'}</p>
                </div>
                <span className="text-sm text-primary">مشاهده</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">برای این عبارت اپیزود منطبق یافت نشد.</p>
        )}
      </section>
    </div>
  );
}
