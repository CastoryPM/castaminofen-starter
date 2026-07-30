import { Play, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/design-system/common/tag';
import type { PlayableItem } from '../types';

type QueuePanelProps = {
  queue: PlayableItem[];
  currentItem: PlayableItem | null;
  currentIndex: number;
  onPlay: (item: PlayableItem) => void;
  onRemove: (itemId: string) => void;
};

export function QueuePanel({ queue, currentItem, currentIndex, onPlay, onRemove }: QueuePanelProps) {
  const upcoming = queue.filter((item) => item.id !== currentItem?.id);

  return (
    <div className="rounded-[1.4rem] border border-border/70 bg-surface-secondary/70 p-4" aria-label="پنل صف پخش">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-text-primary">صف بعدی</p>
        <Tag className="bg-surface-card text-text-secondary">{upcoming.length} مورد</Tag>
      </div>
      <div className="mt-3 space-y-2">
        {currentItem ? (
          <div className="rounded-[0.95rem] border border-accent/20 bg-accent/10 p-3">
            <p className="text-sm font-semibold text-text-primary">در حال پخش</p>
            <p className="mt-1 text-sm text-text-secondary">{currentItem.title}</p>
          </div>
        ) : null}
        <div className="rounded-[0.95rem] border border-border/70 bg-surface-card/70 p-3 text-sm text-text-secondary">
          <div className="flex items-center gap-2 font-semibold text-text-primary">
            <Sparkles size={14} className="text-accent" />
            <span>پخش بعدی</span>
          </div>
          <p className="mt-1">برای حفظ جریان، موارد بعدی را می‌توان به‌صورت مستقیم پخش، حذف، یا به تأخیر انداخت.</p>
        </div>
        {upcoming.length > 0 ? upcoming.map((item, index) => (
          <div key={item.id} className="flex items-center gap-3 rounded-[0.95rem] border border-border/70 bg-surface-card/80 p-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-[11px] font-semibold text-text-secondary">
              {currentIndex + index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">{item.title}</p>
              <p className="truncate text-xs text-text-secondary">{item.subtitle ?? 'اپیزود'}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={() => onPlay(item)} aria-label={`پخش ${item.title}`}>
                <Play size={14} />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={() => onRemove(item.id)} aria-label={`حذف ${item.title}`}>
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        )) : <p className="rounded-[0.95rem] border border-dashed border-border/70 bg-surface-card/60 p-3 text-sm text-text-secondary">هیچ موردی در صف بعدی وجود ندارد.</p>}
        <div className="rounded-[0.95rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
          <div className="flex items-center justify-between gap-2">
            <span>بعداً</span>
            <Tag className="bg-surface-card text-text-secondary">ذخیره در پلی‌لیست</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}
