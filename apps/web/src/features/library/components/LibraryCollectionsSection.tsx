'use client';

import { Clock3, Download, Heart, Library } from 'lucide-react';
import type { LibraryCollectionsSummary } from '../utils/library-collections';
import { LibraryCollectionCard } from './LibraryCollectionCard';

export function LibraryCollectionsSection({ summary }: { summary: LibraryCollectionsSummary }) {
  const stats = [
    { label: 'مجموعه‌ها', value: summary.collectionsCount },
    { label: 'اپیزودهای ادامه پخش', value: summary.episodesCount },
    { label: 'تاریخچه گوش دادن', value: summary.historyCount },
    { label: 'اشتراک‌ها', value: summary.followingCount },
  ];

  const collections = [
    {
      title: 'تاریخچه گوش دادن',
      description: summary.historyComingSoon
        ? 'گوش دادن‌های اخیر شما در یک روایت آرام و قابل بازگشت کنار هم قرار می‌گیرند.'
        : 'نگاهی به اپیزودهایی که اخیراً گوش داده‌اید و دوباره آن‌ها را پخش کنید.',
      eyebrow: 'History',
      actionLabel: summary.historyComingSoon ? 'به‌زودی' : 'مشاهده تاریخچه',
      href: summary.historyComingSoon ? undefined : '#history',
      badge: summary.historyComingSoon ? 'Coming Soon' : undefined,
      icon: Clock3,
      iconClassName: summary.historyComingSoon ? 'border-border/70 bg-surface-secondary text-text-secondary' : 'border-accent/20 bg-accent/10 text-accent',
      badgeClassName: summary.historyComingSoon ? 'border-border/70 bg-surface-secondary text-text-secondary' : 'border-accent/20 bg-accent/10 text-accent',
      statusLabel: summary.historyComingSoon ? 'به‌زودی' : `${summary.historyCount} مورد تاریخچه`,
    },
    {
      title: 'علاقه‌مندی‌ها',
      description: 'اپیزودها و پادکست‌هایی که دوست دارید برای بازگشت‌های بعدی در اینجا نگه داشته می‌شوند.',
      eyebrow: 'Favorites',
      actionLabel: 'مشاهده',
      href: '/library#favorites',
      icon: Heart,
      iconClassName: 'border-accent/20 bg-accent/10 text-accent',
      badgeClassName: 'border-accent/20 bg-accent/10 text-accent',
      statusLabel: 'در دسترس',
    },
    {
      title: 'دنبال‌شده‌ها',
      description: 'پادکست‌هایی که در حال حاضر دنبال می‌کنید از بخش اشتراک‌ها در دسترس هستند.',
      eyebrow: 'Following',
      actionLabel: 'مشاهده اشتراک‌ها',
      href: '/podcasts',
      icon: Library,
      iconClassName: 'border-accent/20 bg-accent/10 text-accent',
      badgeClassName: 'border-accent/20 bg-accent/10 text-accent',
      statusLabel: 'در دسترس',
    },
    {
      title: 'دانلود‌ها',
      description: 'پخش آفلاین و مدیریت دانلود در نسخه آینده با همین حس آرام و منظم در دسترس خواهند بود.',
      eyebrow: 'Downloads',
      actionLabel: 'به‌زودی',
      badge: 'Coming Soon',
      icon: Download,
      iconClassName: 'border-success/20 bg-success/10 text-success',
      badgeClassName: 'border-success/20 bg-success/10 text-success',
      statusLabel: 'آینده‌ی نزدیک',
    },
  ];

  return (
    <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-5" aria-labelledby="collections-overview-heading">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="m-0 text-sm font-medium text-accent">مجموعه‌های شخصی</p>
          <h2 id="collections-overview-heading" className="text-subheading">کتابخانه شما حالا بیش از یک لیست است</h2>
          <p className="m-0 text-sm text-text-secondary">ادامه گوش دادن، اشتراک‌ها و فضاهای بعدی در یک چیدمان آرام و قابل بازگشت کنار هم قرار گرفته‌اند.</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-border/70 bg-surface-primary px-3 py-1.5 text-sm text-text-secondary">
          دسترسی سریع و آرام
        </span>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.25rem] border border-border/70 bg-surface-primary/90 p-4">
            <p className="m-0 text-2xl font-semibold text-text-primary">{stat.value}</p>
            <p className="m-0 mt-1 text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {collections.map((collection) => (
          <LibraryCollectionCard
            key={collection.title}
            title={collection.title}
            description={collection.description}
            eyebrow={collection.eyebrow}
            actionLabel={collection.actionLabel}
            href={collection.href}
            badge={collection.badge}
            icon={collection.icon}
            iconClassName={collection.iconClassName}
            badgeClassName={collection.badgeClassName}
            statusLabel={collection.statusLabel}
          />
        ))}
      </div>
    </section>
  );
}
