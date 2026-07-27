"use client";

import Link from 'next/link';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Button } from '@/components/ui/button';
import { PodcastCard } from '@/features/podcasts/PodcastCard';
import { useSearch } from '../hooks/useSearch';

export default function SearchResults({ q, page }: { q: string; page: number }) {
  const limit = 12;
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const offline = searchParams.get('offline') === '1' || searchParams.get('offline') === 'true';
  const query = useSearch({ q: q || undefined, page, limit, offline });

  const totalPages = query.data?.pagination.totalPages ?? 1;

  if (query.isLoading) return <LoadingState title="در حال جستجو" message="در حال بررسی نتایج برای عبارت موردنظر هستیم…" />;
  if (query.isError) return <ErrorState title="جستجو با مشکل مواجه شد" message={query.error?.message ?? 'امکان انجام جستجو در این لحظه وجود ندارد.'} description="لطفاً دوباره تلاش کنید." />;

  const items = query.data?.data ?? [];

  if (!items.length) {
    return (
      <EmptyState
        title="نتیجه‌ای یافت نشد"
        description={offline ? `برای «${q || 'جستجوی شما'}» چیزی در کتابخانهٔ آفلاین یافت نشد.` : `برای «${q || 'جستجوی شما'}» هیچ پادکستی پیدا نشد. از عبارت دیگری استفاده کنید.`}
        action={
          <Link href={offline ? '/offline-library' : '/search'} className="inline-flex">
            <Button variant="secondary" size="sm">
              {offline ? 'بازگشت به کتابخانهٔ آفلاین' : 'پاک کردن فیلتر'}
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-surface-primary/70 px-4 py-3">
        <p className="m-0 text-sm text-text-secondary">{items.length} نتیجه برای «{q}»</p>
        {totalPages > 1 ? <p className="m-0 text-sm text-text-secondary">صفحه {page} از {totalPages}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            className="button button-secondary"
            onClick={() => {
              const prev = Math.max(1, page - 1);
              window.location.href = `/search?q=${encodeURIComponent(q)}&page=${prev}`;
            }}
            disabled={page === 1}
            aria-label="رفتن به صفحه‌ی قبلی نتایج"
          >
            قبلی
          </button>

          <span className="rounded-full border border-border bg-surface-secondary px-3 py-1.5 text-sm text-text-secondary">
            {page} / {totalPages}
          </span>

          <button
            className="button button-secondary"
            onClick={() => {
              const next = Math.min(totalPages, page + 1);
              window.location.href = `/search?q=${encodeURIComponent(q)}&page=${next}`;
            }}
            disabled={page === totalPages}
            aria-label="رفتن به صفحه‌ی بعدی نتایج"
          >
            بعدی
          </button>
        </div>
      ) : null}
    </div>
  );
}
