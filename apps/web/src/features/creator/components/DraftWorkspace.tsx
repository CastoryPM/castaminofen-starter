'use client';

import { Clock3, Sparkles, AlertTriangle } from 'lucide-react';
import { MediaCard } from '@/components/design-system/media/media-card';
import { mockCreatorDrafts } from '../data/mockCreatorContentData';

export function DraftWorkspace() {
  return (
    <MediaCard title="فضای پیش‌نویس" subtitle="ادامه ویرایش و تکمیل اطلاعات" meta="Drafts">
      <div className="space-y-3">
        {mockCreatorDrafts.map((draft) => (
          <div key={draft.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-primary">{draft.title}</p>
                <p className="mt-1 text-sm text-text-secondary">آخرین ذخیره: {draft.lastSaved}</p>
              </div>
              <div className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                {draft.completion}%
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-surface-card">
              <div className="h-2 rounded-full bg-accent" style={{ width: `${draft.completion}%` }} />
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
              <AlertTriangle className="h-4 w-4 text-accent" />
              {draft.warning}
            </div>
          </div>
        ))}

        <div className="rounded-[1rem] border border-dashed border-border/70 bg-surface-card/70 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Sparkles className="h-4 w-4 text-accent" />
            ادامه ویرایش
          </div>
          <p className="mt-2 text-sm text-text-secondary">برای تکمیل تجربه‌ی انتشار، جزئیات، پوستر و تنظیمات مخاطب را مرور کن.</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
            <Clock3 className="h-4 w-4" />
            آخرین تغییرات در لحظه‌ی حال حاضر ذخیره شده‌اند.
          </div>
        </div>
      </div>
    </MediaCard>
  );
}
