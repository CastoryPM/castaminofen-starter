import { MediaCard } from '@/components/design-system/media/media-card';
import { Chip } from '@/components/design-system/common/chip';
import type { AdminAIOpportunity } from '../types/ai.types';

export function RecommendationCenter({ opportunities }: { opportunities: AdminAIOpportunity[] }) {
  return (
    <MediaCard title="Growth opportunities" subtitle="Opportunity recommendations" meta="Opportunity engine" className="space-y-3">
      {opportunities.map((opportunity) => (
        <div key={opportunity.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text-primary">{opportunity.title}</p>
            <Chip active>{opportunity.momentum}</Chip>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{opportunity.summary}</p>
        </div>
      ))}
    </MediaCard>
  );
}
