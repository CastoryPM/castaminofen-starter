'use client';

import { Button } from '@/components/ui/button';
import { Tag } from '@/components/design-system/common/tag';

export function PublishingPanel() {
  return (
    <section className="space-y-4 rounded-[1.75rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-caption">انتشار</p>
          <h3 className="text-heading text-lg">آماده‌ی نمایش در فضای Castaminofen</h3>
        </div>
        <Tag className="border-accent/20 bg-accent/10 text-accent">Publish Ready</Tag>
      </div>
      <div className="rounded-[1.25rem] border border-border/70 bg-surface-secondary/70 p-4">
        <p className="text-sm text-text-secondary">این مرحله‌ی UI برای تنظیم مخاطب، دسترسی و انتشار آماده است و در آینده به باطن انتشار واقعی متصل خواهد شد.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="primary">انتشار</Button>
          <Button variant="secondary">ذخیره پیش‌نویس</Button>
        </div>
      </div>
    </section>
  );
}
