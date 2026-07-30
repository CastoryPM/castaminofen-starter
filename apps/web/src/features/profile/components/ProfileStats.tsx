import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileMetric } from '../types/profile.types';

type ProfileStatsProps = {
  stats: ProfileMetric[];
};

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <MediaCard key={stat.id} title={stat.label} subtitle={stat.detail} meta={stat.value} className="min-h-full">
          <p className="text-sm text-text-secondary">{stat.detail}</p>
        </MediaCard>
      ))}
    </section>
  );
}
