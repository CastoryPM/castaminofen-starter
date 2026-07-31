import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import type { AdminAIOverview } from '../types/ai.types';

export function AIOverviewPanel({ overview }: { overview: AdminAIOverview }) {
  return (
    <MediaCard title={overview.title} subtitle="Executive signal overview" meta="Daily summary" className="space-y-4">
      <p className="text-sm text-text-secondary">{overview.summary}</p>
      <div className="flex flex-wrap gap-2">
        {overview.signals.map((signal) => (
          <Tag key={signal}>{signal}</Tag>
        ))}
      </div>
    </MediaCard>
  );
}
