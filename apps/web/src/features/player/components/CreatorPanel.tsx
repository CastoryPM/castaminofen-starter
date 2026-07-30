import { BellRing, MessageSquareText, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/design-system/media/media-card';

export function CreatorPanel() {
  return (
    <MediaCard title="سارا رضایی" subtitle="پادکست و آموزش" meta="دنبال می‌کنید" className="h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary text-sm font-semibold text-text-primary">SR</div>
            <div>
              <p className="text-sm font-semibold text-text-primary">سارا رضایی</p>
              <p className="text-xs text-text-secondary">۴۲ نفر این لحظه را دنبال می‌کنند</p>
            </div>
          </div>
          <Button type="button" variant="secondary" size="sm" className="rounded-full">دنبال کردن</Button>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-[0.95rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
            <div className="flex items-center gap-2 text-text-primary">
              <Users size={14} />
              <span>جامعه</span>
            </div>
            <p className="mt-1">۱۲۶ فعالیت اخیر</p>
          </div>
          <div className="rounded-[0.95rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
            <div className="flex items-center gap-2 text-text-primary">
              <MessageSquareText size={14} />
              <span>بحث</span>
            </div>
            <p className="mt-1">۸ بحث تازه</p>
          </div>
          <div className="rounded-[0.95rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
            <div className="flex items-center gap-2 text-text-primary">
              <BellRing size={14} />
              <span>انتشار بعدی</span>
            </div>
            <p className="mt-1">سه‌شنبه ۲۰:۰۰</p>
          </div>
        </div>
        <div className="rounded-[1rem] border border-border/70 bg-gradient-to-r from-accent/10 to-sky-500/10 p-3 text-sm text-text-secondary">
          <div className="flex items-center gap-2 font-semibold text-text-primary">
            <Sparkles size={14} className="text-accent" />
            <span>یادداشت سازنده</span>
          </div>
          <p className="mt-1">این لحظه برای درک کلی موضوع خیلی مهم است و در نسخه‌ی بعدی به‌صورت قابل‌پخش مستقیم در timeline درمی‌آید.</p>
        </div>
      </div>
    </MediaCard>
  );
}
