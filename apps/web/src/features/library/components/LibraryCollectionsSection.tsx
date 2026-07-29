'use client';

import type { LibraryCollectionsSummary } from '../utils/library-collections';
import { LibraryCollectionCard } from './LibraryCollectionCard';

export function LibraryCollectionsSection({ summary }: { summary: LibraryCollectionsSummary }) {
  const stats = [
    { label: 'ادامه پخش', value: summary.continueListeningCount },
    { label: 'اشتراک‌ها', value: summary.subscriptionsCount },
    { label: 'آخرین بازدید', value: summary.recentlyPlayedCount },
  ];

  return (
    <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-5" aria-labelledby="collections-overview-heading">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 id="collections-overview-heading" className="text-subheading">مجموعه‌های کتابخانه</h2>
          <p className="m-0 text-sm text-text-secondary">از آخرین پخش‌ها تا پادکست‌های دنبال‌شده، کتابخانه شما در یک نمای منظم‌تر در دسترس است.</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-primary px-3 py-1.5 text-sm text-text-secondary">
          دسترسی سریع
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.25rem] border border-border/70 bg-surface-primary/90 p-4">
            <p className="m-0 text-2xl font-semibold text-text-primary">{stat.value}</p>
            <p className="m-0 mt-1 text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <LibraryCollectionCard
          title="علاقه‌مندی‌ها"
          description="اپیزودها و پادکست‌های ذخیره‌شده در نسخه بعدی در اینجا ظاهر می‌شوند."
          eyebrow="Favorites"
          actionLabel="به‌زودی"
          badge="Coming Soon"
        />
        <LibraryCollectionCard
          title="تاریخچه گوش دادن"
          description="پخش‌های اخیر به‌صورت زمانی مرتب می‌شوند و در آینده در این بخش نمایان می‌شوند."
          eyebrow="History"
          actionLabel="به‌زودی"
          badge="Coming Soon"
        />
        <LibraryCollectionCard
          title="دنبال‌شده‌ها"
          description="پادکست‌هایی که در حال حاضر دنبال می‌کنید از بخش اشتراک‌ها در دسترس‌اند."
          eyebrow="Following"
          actionLabel="مشاهده اشتراک‌ها"
          href="/podcasts"
        />
        <LibraryCollectionCard
          title="دانلود‌ها"
          description="این بخش در نسخه آینده با پشتیبانی آفلاین و مدیریت دانلود ارائه می‌شود."
          eyebrow="Downloads"
          actionLabel="به‌زودی"
          badge="Coming Soon"
        />
      </div>
    </section>
  );
}
