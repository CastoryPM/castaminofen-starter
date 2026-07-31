import { MediaCard } from '@/components/design-system/media/media-card';
import { Chip } from '@/components/design-system/common/chip';
import type { AdminAICommunityInsight } from '../types/ai.types';

export function CommunityHealthAdvisor({ insights }: { insights: AdminAICommunityInsight[] }) {
  return (
    <MediaCard title="Community health advisor" subtitle="Discussion quality and community signals" meta="Community intelligence" className="space-y-3">
      {insights.map((insight) => (
        <div key={insight.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text-primary">{insight.title}</p>
            <Chip>{insight.quality}</Chip>
          </div>
          <p className="mt-2 text-sm text-text-secondary">Recommended action: {insight.action}</p>
        </div>
      ))}
    </MediaCard>
  );
}
