import { MediaCard } from '@/components/design-system/media/media-card';
import { Chip } from '@/components/design-system/common/chip';
import type { AdminAICreatorInsight } from '../types/ai.types';

export function CreatorOpportunityPanel({ creatorInsights }: { creatorInsights: AdminAICreatorInsight[] }) {
  return (
    <MediaCard title="Creator success advisor" subtitle="Creator health and opportunity hints" meta="Creator intelligence" className="space-y-3">
      {creatorInsights.map((creator) => (
        <div key={creator.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text-primary">{creator.name}</p>
            <Chip active>{creator.relationship}</Chip>
          </div>
          <div className="mt-3 grid gap-2 text-sm text-text-secondary sm:grid-cols-3">
            <p>Growth: {creator.growth}</p>
            <p>Engagement: {creator.engagement}</p>
            <p>Relationship: {creator.relationship}</p>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{creator.suggestion}</p>
        </div>
      ))}
    </MediaCard>
  );
}
