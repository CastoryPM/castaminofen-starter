import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileContributionItem } from '../types/profile.types';

type ProfileContributionSectionProps = {
  contributions: ProfileContributionItem[];
};

export function ProfileContributionSection({ contributions }: ProfileContributionSectionProps) {
  return (
    <MediaCard title="هویت مشارکتی" subtitle="چگونه در Castaminofen ارزش ایجاد می‌کنی" meta="Contribution" className="space-y-3">
      <div className="space-y-2">
        {contributions.map((item) => (
          <div key={item.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <p className="text-sm font-semibold text-text-primary">{item.label}</p>
            <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
          </div>
        ))}
      </div>
    </MediaCard>
  );
}
