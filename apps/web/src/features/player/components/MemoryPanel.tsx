import { BookMarked, Clock3, MessageSquareText, Sparkles, Star, StickyNote } from 'lucide-react';
import { MediaCard } from '@/components/design-system/media/media-card';
import { getPlayerMemoryCollections } from '../data/mockPlayerExperience';

const iconMap = {
  bookmark: BookMarked,
  highlight: Star,
  note: StickyNote,
  resume: Clock3,
} as const;

export function MemoryPanel() {
  const collections = getPlayerMemoryCollections();

  return (
    <div className="space-y-3">
      <MediaCard title="فضای حافظه" subtitle="یک آرشیو شخصی از لحظه‌ها و یادداشت‌ها" className="h-full">
        <div className="space-y-2">
          {collections.map((item) => {
            const Icon = iconMap[item.accent];
            return (
              <div key={item.title} className="flex items-center gap-3 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                  <p className="text-sm text-text-secondary">{item.subtitle}</p>
                </div>
                <span className="rounded-full bg-surface-card px-2.5 py-1 text-xs font-semibold text-text-secondary">{item.count}</span>
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
        <p className="mt-2">این بخش از داده‌ی داخلی و mock برای جمع‌آوری نشانک‌ها، هایلایت‌ها، یادداشت‌ها و بازگشت‌های سریع استفاده می‌کند.</p>
      </div>
    </div>
  );
}
