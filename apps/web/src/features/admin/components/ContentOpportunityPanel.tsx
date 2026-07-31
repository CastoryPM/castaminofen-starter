import { MediaCard } from '@/components/design-system/media/media-card';
import { Chip } from '@/components/design-system/common/chip';
import type { AdminAIContentOpportunity } from '../types/ai.types';

export function ContentOpportunityPanel({ opportunities }: { opportunities: AdminAIContentOpportunity[] }) {
  return (
    <MediaCard title="Content intelligence advisor" subtitle="Trending opportunities" meta="Content signals" className="space-y-3">
      {opportunities.map((opportunity) => (
        <div key={opportunity.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text-primary">{opportunity.topic}</p>
            <Chip>{opportunity.format}</Chip>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{opportunity.note}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">{opportunity.category}</p>
        </div>
      ))}
    </MediaCard>
  );
}
