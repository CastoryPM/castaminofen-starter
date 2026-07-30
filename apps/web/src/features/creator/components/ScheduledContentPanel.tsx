'use client';

import { CalendarClock, Clock3 } from 'lucide-react';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Button } from '@/components/ui/button';

export function ScheduledContentPanel() {
  return (
    <MediaCard title="صف انتشار آینده" subtitle="محتوای زمان‌بندی‌شده برای انتشار" meta="Scheduled">
      <div className="space-y-3">
        <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">کارگاه زنده</p>
              <p className="mt-1 text-sm text-text-secondary">منتشر می‌شود در ۲۰:۰۰ امروز</p>
            </div>
            <div className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
              ۲ ساعت دیگر
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="secondary">ویرایش زمان‌بندی</Button>
            <Button type="button" size="sm" variant="ghost">لغو زمان‌بندی</Button>
            <Button type="button" size="sm" variant="primary">انتشار هم‌اکنون</Button>
          </div>
        </div>
        <div className="rounded-[1rem] border border-dashed border-border/70 bg-surface-card/70 p-3 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-accent" />
            برنامه‌ی آینده به‌صورت خودکار در صف انتشار نمایش داده می‌شود.
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-accent" />
            وضعیت صف و زمان باقیمانده برای مدیریت سریع نمایش داده می‌شود.
          </div>
        </div>
      </div>
    </MediaCard>
  );
}
