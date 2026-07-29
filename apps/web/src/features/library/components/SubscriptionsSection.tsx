'use client';

import { Library as LibraryIcon } from 'lucide-react';
import { useSubscribePodcast } from '../hooks/useSubscribePodcast';
import { useUnsubscribePodcast } from '../hooks/useUnsubscribePodcast';
import type { LibrarySubscription } from '../types';
import { LibraryEmptyState } from './LibraryEmptyState';
import { LibraryPodcastCard } from './LibraryPodcastCard';

export function SubscriptionsSection({ items }: { items: LibrarySubscription[] }) {
  const subscribeMutation = useSubscribePodcast();
  const unsubscribeMutation = useUnsubscribePodcast();

  if (!items.length) {
    return (
      <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-5" aria-labelledby="subscriptions-heading">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 id="subscriptions-heading" className="text-subheading">اشتراک‌ها</h2>
            <p className="m-0 text-sm text-text-secondary">پادکست‌هایی که دنبال می‌کنید در این بخش مرتب شده‌اند.</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-primary px-3 py-1.5 text-sm text-text-secondary">
            هنوز خالی است
          </span>
        </div>
        <LibraryEmptyState
          title="هنوز پادکستی را دنبال نمی‌کنید"
          description="پادکست‌هایی که دنبال می‌کنید در این بخش ظاهر می‌شوند و بعداً در کتابخانه شما دسترسی سریعی خواهند داشت."
          eyebrow="جستجو و دنبال کردن"
          icon={LibraryIcon}
        />
      </section>
    );
  }

  return (
    <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-5" aria-labelledby="subscriptions-heading">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 id="subscriptions-heading" className="text-subheading">اشتراک‌ها</h2>
          <p className="m-0 text-sm text-text-secondary">پادکست‌هایی که دنبال می‌کنید در این بخش مرتب شده‌اند.</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-primary px-3 py-1.5 text-sm text-text-secondary">
          {items.length} پادکست
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <LibraryPodcastCard
            key={item.id}
            podcast={item.podcast}
            subscribedAt={item.subscribedAt}
            isSubscribed
            onSubscribe={() => subscribeMutation.mutate(item.podcast.id)}
            onUnsubscribe={() => unsubscribeMutation.mutate(item.podcast.id)}
            isLoading={subscribeMutation.isPending || unsubscribeMutation.isPending}
            error={subscribeMutation.error || unsubscribeMutation.error ? 'در انجام این عملیات مشکلی پیش آمد. دوباره تلاش کنید.' : null}
          />
        ))}
      </div>
    </section>
  );
}
