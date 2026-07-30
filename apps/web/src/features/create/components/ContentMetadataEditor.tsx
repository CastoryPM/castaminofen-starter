'use client';

import { Input } from '@/components/ui/input';
import { Tag } from '@/components/design-system/common/tag';

export function ContentMetadataEditor() {
  return (
    <section className="space-y-4 rounded-[1.75rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-caption">متادیتا و انتشار</p>
          <h3 className="text-heading text-lg">برای ساختن تجربه‌ی قابل‌پیدا و قابل‌فهم</h3>
        </div>
        <Tag className="border-accent/20 bg-accent/10 text-accent">SEO Ready</Tag>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-text-primary">عنوان</span>
          <Input placeholder="عنوان اثر یا اپیزود" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-text-primary">سازنده</span>
          <Input placeholder="نام سازنده" />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-text-primary">توضیحات</span>
          <textarea className="min-h-24 w-full rounded-[1rem] border border-border/80 bg-surface-secondary/70 px-3 py-3 text-sm text-text-primary outline-none ring-0" placeholder="توضیحی که مخاطب را به تجربه‌ی بعدی دعوت کند" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-text-primary">دسته‌بندی</span>
          <Input placeholder="مثلاً آموزش، داستان، جامعه" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-text-primary">برچسب‌ها</span>
          <Input placeholder="AI, پادکست, جامعه" />
        </label>
      </div>
    </section>
  );
}
