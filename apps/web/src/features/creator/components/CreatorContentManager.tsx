'use client';

import { Archive, BookOpen, Sparkles, Layers3, CheckCircle2, Clock3 } from 'lucide-react';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { MediaCard } from '@/components/design-system/media/media-card';
import { EmptyState } from '@/components/ui/empty-state';
import { ContentStatusFilter } from './ContentStatusFilter';
import { DraftWorkspace } from './DraftWorkspace';
import { PublishingWorkflow } from './PublishingWorkflow';
import { ScheduledContentPanel } from './ScheduledContentPanel';
import { ContentVersionHistory } from './ContentVersionHistory';
import { mockCreatorContentItems } from '../data/mockCreatorContentData';

export function CreatorContentManager() {
  const summary = [
    { label: 'کل محتوا', value: mockCreatorContentItems.length.toString(), icon: BookOpen },
    { label: 'منتشرشده', value: '1', icon: CheckCircle2 },
    { label: 'پیش‌نویس', value: '2', icon: Clock3 },
    { label: 'زمان‌بندی‌شده', value: '1', icon: Layers3 },
    { label: 'بایگانی', value: '1', icon: Archive },
  ];

  return (
    <main className="page-container" aria-labelledby="creator-content-manager-heading">
      <PageContainer>
        <section className="space-y-6">
          <div className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  <Sparkles className="h-4 w-4" />
                  داشبورد مدیریت محتوا
                </div>
                <h1 id="creator-content-manager-heading" className="text-heading">
                  از ایده تا انتشار، همه‌ی مسیرهای محتوا در یک مرکز حرفه‌ای
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-text-secondary">
                  وضعیت انتشار، پیش‌نویس‌ها، زمان‌بندی و نسخه‌های قبلی در یک نمای منسجم برای تصمیم‌گیری بهتر.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {summary.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[1rem] border border-border/70 bg-surface-card/80 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-text-primary">{item.label}</span>
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-text-primary">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <MediaCard title="کتابخانه محتوا" subtitle="فیلتر، مدیریت و بازبینی سریع" meta="Library">
                <ContentStatusFilter />
                <div className="mt-4 space-y-3">
                  {mockCreatorContentItems.length > 0 ? mockCreatorContentItems.map((item) => (
                    <div key={item.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                          <p className="mt-1 text-sm text-text-secondary">{item.summary}</p>
                        </div>
                        <div className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                          {item.lifecycle}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
                        <span>{item.type}</span>
                        <span>•</span>
                        <span>{item.updatedAt}</span>
                        <span>•</span>
                        <span>{item.visibility === 'public' ? 'عمومی' : item.visibility === 'followers' ? 'فالوورها' : 'خصوصی'}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" className="rounded-full border border-border/70 bg-surface-card px-3 py-1.5 text-xs font-semibold text-text-primary">ویرایش</button>
                        <button type="button" className="rounded-full border border-border/70 bg-surface-card px-3 py-1.5 text-xs font-semibold text-text-primary">پیش‌نمایش</button>
                        <button type="button" className="rounded-full border border-border/70 bg-surface-card px-3 py-1.5 text-xs font-semibold text-text-primary">تکثیر</button>
                        <button type="button" className="rounded-full border border-border/70 bg-surface-card px-3 py-1.5 text-xs font-semibold text-text-primary">آرشیو</button>
                        <button type="button" className="rounded-full border border-border/70 bg-surface-card px-3 py-1.5 text-xs font-semibold text-text-primary">اشتراک‌گذاری</button>
                      </div>
                    </div>
                  )) : <EmptyState title="محتوایی هنوز وجود ندارد" description="برای شروع، اولین محتوای خود را ایجاد کن." />}
                </div>
              </MediaCard>

              <DraftWorkspace />
              <ScheduledContentPanel />
              <ContentVersionHistory />
            </div>

            <div className="space-y-6">
              <PublishingWorkflow />
              <MediaCard title="بررسی انتشار" subtitle="چک‌لیست آماده‌بودن برای انتشار" meta="Review">
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <span>پوستر</span>
                    <span className="text-accent">✓</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <span>متادیتا</span>
                    <span className="text-accent">✓</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <span>دسته‌بندی</span>
                    <span className="text-accent">✓</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <span>توضیحات</span>
                    <span className="text-accent">⚠</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <span>تنظیمات جامعه</span>
                    <span className="text-accent">✓</span>
                  </div>
                </div>
              </MediaCard>
              <MediaCard title="سازماندهی" subtitle="Collection، Series و Season" meta="Organization">
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">فصل ۱ — پادکست آموزش هوش مصنوعی</div>
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">سری یادگیری AI</div>
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">مجموعه کسب‌وکار</div>
                </div>
              </MediaCard>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
