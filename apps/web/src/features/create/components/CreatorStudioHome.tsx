'use client';

import { Compass, Sparkles, Users, Wand2, BarChart3, MessageSquareText, Layers3 } from 'lucide-react';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import { Button } from '@/components/ui/button';
import { ContentMetadataEditor } from './ContentMetadataEditor';
import { ContentTypeSelector } from './ContentTypeSelector';
import { DraftManager } from './DraftManager';
import { PublishingPanel } from './PublishingPanel';
import { mockAnalytics, mockDrafts, mockPreviews } from '../data/mockCreatorStudioData';

export function CreatorStudioHome() {
  return (
    <main className="page-container" aria-labelledby="creator-studio-heading">
      <PageContainer>
        <section className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <Tag className="w-fit border-accent/20 bg-accent/10 text-accent">
                <Sparkles className="ml-1 h-4 w-4" aria-hidden="true" />
                استودیو سازنده
              </Tag>
              <h1 id="creator-studio-heading" className="text-heading">
                از ایده تا انتشار، همه‌ی مسیر خلق را در یک تجربه‌ی حرفه‌ای تجربه کن
              </h1>
              <p className="m-0 text-body">
                اینجا فضای ساختن، سازمان‌دهی، انتشار و رشد هویت سازنده در کنار جامعه، Player و پروفایل جمع شده است.
              </p>
            </div>
            <Button variant="secondary">ایجاد محتوا</Button>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-4">
              <ContentTypeSelector />
              <ContentMetadataEditor />
              <PublishingPanel />
              <DraftManager drafts={mockDrafts} />
            </div>

            <div className="space-y-4">
              <MediaCard title="هویت سازنده" subtitle="آواتار، بیو، موضوعات و حضور جامعه" meta="Creator Identity">
                <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">ک</div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">کیمیاگر محتوا</p>
                      <p className="text-sm text-text-secondary">پادکست، آموزش و تجربه‌ی جامعه</p>
                    </div>
                  </div>
                </div>
              </MediaCard>

              <MediaCard title="پیش‌نمایش مخاطب" subtitle="Player، Community و Profile" meta="Preview">
                <div className="space-y-2">
                  {mockPreviews.map((preview) => (
                    <div key={preview.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{preview.label}</p>
                          <p className="mt-1 text-sm text-text-secondary">{preview.description}</p>
                        </div>
                        <Compass className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  ))}
                </div>
              </MediaCard>

              <MediaCard title="درآمد و رشد" subtitle="دیدگاه‌های کلیدی برای آینده" meta="Analytics Preview">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <BarChart3 className="h-4 w-4 text-accent" />
                      بازدیدها
                    </div>
                    <p className="mt-2 text-lg font-semibold text-text-primary">{mockAnalytics.views.toLocaleString('fa-IR')}</p>
                  </div>
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Users className="h-4 w-4 text-accent" />
                      مخاطب
                    </div>
                    <p className="mt-2 text-lg font-semibold text-text-primary">{mockAnalytics.listeners.toLocaleString('fa-IR')}</p>
                  </div>
                </div>
              </MediaCard>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { icon: Wand2, title: 'خلاقانه', body: 'از انتخاب الگو تا انتشار، مسیر ساختن روان و حرفه‌ای است.' },
              { icon: Layers3, title: 'سازمان‌یافته', body: 'مجموعه‌ها، سری‌ها و مسیرهای آموزش در کنار محتوا قرار می‌گیرند.' },
              { icon: MessageSquareText, title: 'تعامل‌محور', body: 'بحث، بازخورد و جامعه در کنار اثر قرار می‌گیرند.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.25rem] border border-border/70 bg-surface-card/80 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <Icon className="h-4 w-4 text-accent" />
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
