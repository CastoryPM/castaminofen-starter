'use client';

import { CheckCircle2, Radio, Send, Eye } from 'lucide-react';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Button } from '@/components/ui/button';

const steps = [
  { title: 'مرحله ۱', detail: 'بررسی آمادگی محتوا', icon: CheckCircle2 },
  { title: 'مرحله ۲', detail: 'تنظیم دسترسی مخاطب', icon: Radio },
  { title: 'مرحله ۳', detail: 'انتشار فوری یا زمان‌بندی', icon: Send },
  { title: 'مرحله ۴', detail: 'پیش‌نمایش نهایی', icon: Eye },
];

export function PublishingWorkflow() {
  return (
    <MediaCard title="گردش کاری انتشار" subtitle="راهنمای قدم‌به‌قدم برای انتشار حرفه‌ای" meta="Workflow">
      <div className="space-y-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex items-start gap-3 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
              <div className="rounded-full bg-accent/10 p-2 text-accent">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">{step.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{step.detail}</p>
              </div>
            </div>
          );
        })}
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="primary">انتشار فوری</Button>
          <Button type="button" variant="secondary">ذخیره به‌عنوان پیش‌نویس</Button>
        </div>
      </div>
    </MediaCard>
  );
}
