import { BookMarked, Clock3, MessageSquareText, Sparkles, Star } from 'lucide-react';
import { MediaCard } from '@/components/design-system/media/media-card';

const memoryItems = [
  { title: 'نشانک‌های ذخیره‌شده', subtitle: '۳ لحظه‌ی ارزشمند برای بازگشت', icon: BookMarked },
  { title: 'هایلایت‌های شخصی', subtitle: '۲ نقل‌قول مهم', icon: Star },
  { title: 'بحث‌های اخیر', subtitle: '۴ گفت‌وگوی لحظه‌ای', icon: MessageSquareText },
  { title: 'ادامه‌ی پخش', subtitle: 'از ۱۸:۴۰ ادامه بده', icon: Clock3 },
];

export function MemoryPanel() {
  return (
    <div className="space-y-3">
      <MediaCard title="فضای حافظه" subtitle="یک آرشیو شخصی از لحظه‌ها و یادداشت‌ها" className="h-full">
        <div className="space-y-2">
          {memoryItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                  <p className="text-sm text-text-secondary">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </MediaCard>
      <div className="rounded-[1.4rem] border border-border/70 bg-gradient-to-r from-accent/10 to-sky-500/10 p-4 text-sm text-text-secondary">
        <div className="flex items-center gap-2 font-semibold text-text-primary">
          <Sparkles size={16} className="text-accent" />
          <span>ذخیره‌ی هوشمند لحظه‌ها</span>
        </div>
        <p className="mt-2">این بخش در آینده با همگام‌سازی و فیلترهای هوشمند تکمیل می‌شود اما حالا از داده‌های داخلی و mock برای تجربه‌ی کامل استفاده می‌کند.</p>
      </div>
    </div>
  );
}
