'use client';

import { useLibraryOverview } from '../hooks/useLibraryOverview';
import { buildLibraryCollectionsSummary } from '../utils/library-collections';
import { ContinueListeningSection } from './ContinueListeningSection';
import { LibraryEmptyState } from './LibraryEmptyState';
import { LibraryErrorState } from './LibraryErrorState';
import { LibraryHistorySection } from './LibraryHistorySection';
import { LibraryLoadingState } from './LibraryLoadingState';
import { SubscriptionsSection } from './SubscriptionsSection';
import { LibraryCollectionsSection } from './LibraryCollectionsSection';
import { LibraryFavoritesSection } from './LibraryFavoritesSection';
import { getLastActivityLabel, getLibraryGreeting, getListeningStreakFromHistory } from '../utils/library-personalization';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeader } from '@/components/layout/section-header';
import { ContentCarousel } from '@/components/layout/content-carousel';
import { MediaCard } from '@/components/layout/media-card';

export function LibraryPage() {
  const overviewQuery = useLibraryOverview();

  const isLoading = overviewQuery.isLoading;
  const isError = overviewQuery.isError;

  const subscriptions = overviewQuery.data?.subscriptions ?? [];
  const continueListening = overviewQuery.data?.continueListening ?? [];
  const history = overviewQuery.data?.history ?? [];
  const continueListeningIds = new Set(continueListening.map((item) => item.episodeId));
  const historyItems = history.filter((item) => !continueListeningIds.has(item.episodeId));
  const collectionSummary = buildLibraryCollectionsSummary({ subscriptions, continueListening, history });
  const hasAnyContent = subscriptions.length > 0 || continueListening.length > 0 || history.length > 0;
  const now = new Date();
  const greeting = getLibraryGreeting(now);
  const latestActivityItem = [...history, ...continueListening]
    .slice()
    .sort((left, right) => new Date(right.lastPlayedAt).getTime() - new Date(left.lastPlayedAt).getTime())[0];
  const lastActivityLabel = getLastActivityLabel(latestActivityItem?.lastPlayedAt, now);
  const listeningStreak = getListeningStreakFromHistory(history);
  const greetingSubtitle = now.getHours() < 12
    ? 'برای شروع روز، یک اپیزود آرام انتخاب کن.'
    : now.getHours() < 18
      ? 'برای ادامه‌ی گوش دادن، اینجا جای خوبی برای برگرداندن خودت است.'
      : now.getHours() < 22
        ? 'امشب هم می‌توانی به جایی که قطع کردی برگردی.'
        : 'شب آرامی برای گوش دادن داشته باش.';

  if (isLoading) {
    return <div className="space-y-4"><LibraryLoadingState /></div>;
  }

  if (isError && !hasAnyContent) {
    return <div className="space-y-4"><LibraryErrorState onRetry={() => { void overviewQuery.refetch(); }} /></div>;
  }

  if (!hasAnyContent) {
    return (
      <PageContainer>
        <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="m-0 text-sm font-medium text-accent">کتابخانه‌ی شما</p>
              <h1 className="text-heading">{greeting}</h1>
              <p className="text-body m-0 max-w-2xl">{greetingSubtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary" role="list" aria-label="خلاصه‌ی کتابخانه">
              <span className="inline-flex items-center rounded-full border border-border bg-surface-primary px-3 py-1.5">در انتظار شروع</span>
            </div>
          </div>
        </section>
        <LibraryEmptyState
          title="کتابخانه شما هنوز خالی است"
          description="همین امروز چند پادکست را پیدا کنید و این فضا به‌تدریج به یک خانه‌ی شخصی برای گوش دادن تبدیل شود."
          eyebrow="از اینجا به مسیر پادکست‌ها بروید"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="m-0 text-sm font-medium text-accent">کتابخانه‌ی شما</p>
            <h1 className="text-heading">{greeting}</h1>
            <p className="text-body m-0 max-w-2xl">{greetingSubtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary" role="list" aria-label="خلاصه‌ی کتابخانه">
              {collectionSummary.continueListeningCount > 0 ? (
                <span className="inline-flex items-center rounded-full border border-border bg-surface-primary px-3 py-1.5">{collectionSummary.continueListeningCount} اپیزود در ادامه پخش</span>
              ) : null}
              {collectionSummary.subscriptionsCount > 0 ? (
                <span className="inline-flex items-center rounded-full border border-border bg-surface-primary px-3 py-1.5">{collectionSummary.subscriptionsCount} اشتراک فعال</span>
              ) : null}
              {history.length > 0 ? (
                <span className="inline-flex items-center rounded-full border border-border bg-surface-primary px-3 py-1.5">{history.length} اپیزود در تاریخچه</span>
              ) : null}
              {lastActivityLabel ? (
                <span className="inline-flex items-center rounded-full border border-border bg-surface-primary px-3 py-1.5">آخرین فعالیت · {lastActivityLabel}</span>
              ) : null}
              {listeningStreak ? (
                <span className="inline-flex items-center rounded-full border border-border bg-surface-primary px-3 py-1.5">استریک · {listeningStreak} روز</span>
              ) : null}
            </div>
            {lastActivityLabel ? (
              <p className="text-sm text-text-secondary">آخرین بازدید شما در این کتابخانه · {lastActivityLabel}</p>
            ) : null}
          </div>
        </div>
      </section>

      {isError ? (
        <div className="rounded-2xl border border-warning/40 bg-surface-secondary/70 p-3 sm:p-4">
          <LibraryErrorState onRetry={() => { void overviewQuery.refetch(); }} />
        </div>
      ) : null}

      <div className="space-y-4 sm:space-y-6">
        <SectionHeader eyebrow="پلتفرم" title="مرکز شخصی شما" description="این بخش‌ها در یک ساختار مشترک و قابل تشخیص قرار گرفته‌اند." />
        <ContentCarousel className="gap-3">
          <MediaCard title="اشتراک‌ها" subtitle="پادکست‌های دنبال‌شده" meta={`${subscriptions.length}`} className="min-w-[11rem]" />
          <MediaCard title="ادامه پخش" subtitle="در حال گوش دادن" meta={`${continueListening.length}`} className="min-w-[11rem]" />
          <MediaCard title="تاریخچه" subtitle="آخرین بازدیدها" meta={`${history.length}`} className="min-w-[11rem]" />
        </ContentCarousel>
        <LibraryCollectionsSection summary={collectionSummary} />
        <LibraryFavoritesSection />
        <ContinueListeningSection items={continueListening} />
        <LibraryHistorySection items={historyItems} />
        <SubscriptionsSection items={subscriptions} />
      </div>
    </PageContainer>
  );
}
