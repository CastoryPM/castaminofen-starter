'use client';

import { Tag } from '@/components/design-system/common/tag';
import type { CreatorDraft } from '../types/creator.types';

export function DraftManager({ drafts }: { drafts: CreatorDraft[] }) {
  return (
    <section className="space-y-4 rounded-[1.75rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-caption">پیش‌نویس‌ها</p>
          <h3 className="text-heading text-lg">ادامه‌ی کار از جایی که متوقف شده‌ای</h3>
        </div>
        <Tag className="border-border/70 bg-surface-secondary/80 text-text-secondary">Draft Flow</Tag>
      </div>

      <div className="space-y-3">
        {drafts.map((draft) => (
          <div key={draft.id} className="flex flex-col gap-3 rounded-[1.25rem] border border-border/70 bg-surface-secondary/70 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-text-primary">{draft.title}</p>
              <p className="mt-1 text-sm text-text-secondary">{draft.type} • {draft.updatedAt}</p>
            </div>
            <Tag className={draft.status === 'Published' ? 'border-accent/20 bg-accent/10 text-accent' : 'border-border/70 bg-surface-card/80 text-text-secondary'}>{draft.status}</Tag>
          </div>
        ))}
      </div>
    </section>
  );
}
