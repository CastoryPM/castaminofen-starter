import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileContentItem } from '../types/profile.types';

type ProfileContentCollectionProps = {
  items: ProfileContentItem[];
};

export function ProfileContentCollection({ items }: ProfileContentCollectionProps) {
  return (
    <MediaCard title="هویت محتوایی" subtitle="محتوایی که تو را تعریف می‌کند" meta="Identity" className="space-y-3">
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-2 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">{item.title}</p>
              <p className="text-sm text-text-secondary">{item.subtitle}</p>
            </div>
            <span className="rounded-full border border-border/70 bg-surface-card px-2.5 py-1 text-xs text-text-secondary">{item.meta}</span>
          </div>
        ))}
      </div>
    </MediaCard>
  );
}
