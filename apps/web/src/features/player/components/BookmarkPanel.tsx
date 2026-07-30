import { useMemo, useState } from 'react';
import { Bookmark as BookmarkIcon, PencilLine, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatTime } from '../utils/playerPresentation';
import { getPlayerExperienceViewModel } from '../data/mockPlayerExperience';

type BookmarkEntry = {
  id: string;
  timestamp: number;
  note: string;
};

export function BookmarkPanel() {
  const initialEntries = useMemo(() => getPlayerExperienceViewModel(320).bookmarks.map((bookmark) => ({ id: bookmark.id, timestamp: bookmark.timestamp, note: bookmark.note })), []);
  const [entries, setEntries] = useState<BookmarkEntry[]>(initialEntries);
  const [note, setNote] = useState('');
  const [activeTimestamp, setActiveTimestamp] = useState(320);

  const summary = useMemo(() => `${entries.length} نشانک ذخیره شده`, [entries.length]);

  const addBookmark = () => {
    if (!note.trim()) {
      return;
    }

    setEntries((current) => [
      ...current,
      { id: `bm-${Date.now()}`, timestamp: activeTimestamp, note: note.trim() },
    ]);
    setNote('');
  };

  const removeBookmark = (id: string) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  };

  return (
    <div className="rounded-[1.4rem] border border-border/70 bg-surface-secondary/70 p-4" aria-label="پنل نشانک‌ها">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-text-primary">نشانک‌ها</p>
        <span className="text-xs text-text-secondary">{summary}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          aria-label="یادداشت نشانک"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="flex-1 rounded-full border border-border/70 bg-surface-card px-3 py-2 text-sm text-text-primary outline-none"
          placeholder="یادداشت برای لحظه‌ی فعلی"
        />
        <Button type="button" variant="secondary" size="sm" className="rounded-full" onClick={addBookmark} aria-label="ذخیره نشانک">
          <BookmarkIcon size={14} />
        </Button>
      </div>
      <div className="mt-3 space-y-2">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start justify-between gap-2 rounded-[0.95rem] border border-border/70 bg-surface-card/80 p-3">
            <div>
              <p className="text-sm font-medium text-text-primary">{formatTime(entry.timestamp)}</p>
              <p className="mt-1 text-sm text-text-secondary">{entry.note}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" aria-label={`ویرایش ${entry.note}`}>
                <PencilLine size={14} />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" aria-label={`حذف ${entry.note}`} onClick={() => removeBookmark(entry.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
