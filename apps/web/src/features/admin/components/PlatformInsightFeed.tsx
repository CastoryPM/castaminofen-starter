import { MediaCard } from '@/components/design-system/media/media-card';
import { Chip } from '@/components/design-system/common/chip';
import type { AdminAIInsight } from '../types/ai.types';

export function PlatformInsightFeed({ insights }: { insights: AdminAIInsight[] }) {
  return (
    <MediaCard title="Platform health intelligence" subtitle="AI-generated ecosystem insights" meta="Live overview" className="space-y-3">
      {insights.map((insight) => (
        <div key={insight.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text-primary">{insight.title}</p>
            <Chip active>{insight.delta}</Chip>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{insight.detail}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">{insight.category}</p>
        </div>
      ))}
    </MediaCard>
  );
}
