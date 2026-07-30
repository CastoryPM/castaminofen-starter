'use client';

import { MessageCircle, Sparkles, Users } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { MediaCard } from '@/components/layout/media-card';
import { SectionHeader } from '@/components/layout/section-header';
import { usePlayerState } from '@/features/player/hooks/usePlayerState';

export function CommunityPage() {
  const { currentItem } = usePlayerState();

  return (
    <main className="page-container" aria-labelledby="community-heading">
      <PageContainer>
        <section className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
                <Users className="h-4 w-4" aria-hidden="true" />
                اجتماع
              </div>
              <h1 id="community-heading" className="text-heading">
                جایی برای دنبال کردن، گفتگو و هم‌راهی با دیگر شنوندگان
              </h1>
              <p className="m-0 text-body">
                تجربه‌ی اجتماعی در اینجا با همان زبان رابط و rhythm صفحه‌های دیگر، بدون ایجاد مسیر یا runtime جداگانه، به کاربر ارائه می‌شود.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface-secondary/80 px-3 py-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              تجربه‌ی یکپارچه
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <MediaCard title="آخرین بحث‌ها" subtitle="از اپیزودهای محبوب و لحظه‌های پخش جاری الهام گرفته شده‌اند." meta="همه‌چیز در یک جریان">
                <div className="space-y-2">
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <p className="text-sm font-semibold text-text-primary">در حال گوش دادن به {currentItem?.title ?? 'اپیزود انتخابی'}</p>
                    <p className="mt-1 text-sm text-text-secondary">{currentItem?.subtitle ?? 'این بخش به‌روزرسانی می‌شود تا حس حضور در جریان پخش حفظ شود.'}</p>
                  </div>
                  <div className="rounded-[1rem] border border-dashed border-border/60 bg-surface-card/60 p-3 text-sm text-text-secondary">
                    اینجا می‌توان رایزنی، پیشنهاد و نظرات همراه با پادکست‌ها را در یک قالب مشترک و سبک‌تر دیده کرد.
                  </div>
                </div>
              </MediaCard>
              <MediaCard title="نظرات" subtitle="پیش‌نمایش تعامل‌های مرتبط با محتوای جاری" meta="تعامل‌های سبک">
                <div className="space-y-2">
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-start gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary">سارا • چند لحظه پیش</p>
                        <p className="mt-1 text-sm text-text-secondary">این اپیزود حس آرامش و تمرکز بسیار خوبی دارد؛ برای گوش دادن در مسیر رفت‌وآمد عالی است.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </MediaCard>
            </div>

            <div className="space-y-4">
              <MediaCard title="پادکست‌های داغ" subtitle="موضوعات و سبک‌های پرطرفدار در اجتماع" meta="پیشنهادهای هم‌راستا" />
              <MediaCard title="ساعت‌های پخش" subtitle="لحظه‌های محبوب در جریان شنیدن" meta="رسمی و قابل پیگیری" />
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
