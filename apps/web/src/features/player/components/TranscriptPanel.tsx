import { useState } from 'react';
import { MessageSquareText, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const transcriptSegments = [
  { id: 's1', time: 0, text: 'معرفی و زمینه‌ی کلی این بخش برای بازسازی تجربه‌ی کاربر.' },
  { id: 's2', time: 320, text: 'در این لحظه، ایده‌ی اصلی درباره‌ی مشارکت و یادگیری لحظه‌ای مطرح می‌شود.' },
  { id: 's3', time: 1120, text: 'نکته‌ی پایانی برای حفظ و پیگیری بعدی در حافظه‌ی شخصی.' },
];

type TranscriptPanelProps = {
  currentTimestamp?: number;
  onSeek?: (timestamp: number) => void;
};

export function TranscriptPanel({ currentTimestamp = 320, onSeek }: TranscriptPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [query, setQuery] = useState('');

  const filteredSegments = transcriptSegments.filter((segment) => segment.text.includes(query));

  return (
    <div className="rounded-[1.4rem] border border-border/70 bg-surface-secondary/70 p-4" aria-label="پنل رونویس">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <MessageSquareText size={16} className="text-accent" />
          <span>رونویس</span>
        </div>
        <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={() => setExpanded((value) => !value)} aria-label="تغییر حالت رونویس">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </Button>
      </div>
      {expanded ? (
        <>
          <label className="mt-3 flex items-center gap-2 rounded-full border border-border/70 bg-surface-card px-3 py-2 text-sm text-text-secondary">
            <Search size={14} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none" placeholder="جست‌وجوی جمله" aria-label="جستجو در رونویس" />
          </label>
          <div className="mt-3 space-y-2">
            {filteredSegments.map((segment) => {
              const isActive = segment.time <= currentTimestamp && currentTimestamp < segment.time + 300;
              return (
                <button
                  key={segment.id}
                  type="button"
                  className={`w-full rounded-[0.95rem] border px-3 py-2 text-right text-sm text-text-primary ${isActive ? 'border-accent/30 bg-accent/10' : 'border-border/70 bg-surface-card/80'}`}
                  onClick={() => onSeek?.(segment.time)}
                >
                  <span className="block text-[11px] text-text-secondary">{segment.time}s</span>
                  <span className="mt-1 block">{segment.text}</span>
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
