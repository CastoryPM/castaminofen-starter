'use client';

import { History } from 'lucide-react';
import { MediaCard } from '@/components/design-system/media/media-card';
import { mockCreatorVersions } from '../data/mockCreatorContentData';

export function ContentVersionHistory() {
  return (
    <MediaCard title="تاریخچه نسخه‌ها" subtitle="نسخه‌های قبلی و تغییرات منتشرشده" meta="Versions">
      <div className="space-y-3">
        {mockCreatorVersions.map((version) => (
          <div key={version.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <History className="h-4 w-4 text-accent" />
              {version.label}
            </div>
            <p className="mt-2 text-sm text-text-secondary">{version.summary}</p>
            <p className="mt-1 text-sm text-text-secondary">{version.detail}</p>
          </div>
        ))}
      </div>
    </MediaCard>
  );
}
