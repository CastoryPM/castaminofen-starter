import { EmptyState } from '@/components/ui/empty-state';
import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileCollection, ProfileMemory } from '../types/profile.types';

type ProfileKnowledgeSectionProps = {
  memories: ProfileMemory[];
  collections: ProfileCollection[];
};

export function ProfileKnowledgeSection({ memories, collections }: ProfileKnowledgeSectionProps) {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <MediaCard title="حافظه‌ی شخصی" subtitle="لحظه‌های ذخیره‌شده، یادداشت‌ها و بازگشت‌های مهم" meta="Memory" className="space-y-3">
        {memories.length > 0 ? (
          <div className="space-y-2">
            {memories.map((memory) => (
              <div key={memory.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-text-primary">{memory.title}</p>
                  <span className="text-xs text-text-secondary">{memory.kind}</span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{memory.detail}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="هنوز لحظه‌ای ذخیره نشده" description="از پخش‌ها و یادداشت‌ها برای ساختن حافظه‌ی شخصی استفاده کن." />
        )}
      </MediaCard>

      <MediaCard title="My Collections" subtitle="گروه‌های متنی، موضوعی و مسیرهای شخصی" meta="Collections" className="space-y-3">
        {collections.length > 0 ? (
          <div className="space-y-2">
            {collections.map((collection) => (
              <div key={collection.id} className={`rounded-[1rem] border border-border/70 bg-gradient-to-r ${collection.accent} p-3`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-text-primary">{collection.title}</p>
                  <span className="text-xs text-text-secondary">{collection.count} مورد</span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{collection.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="هنوز مجموعه‌ای ندارید" description="مجموعه‌ها به شما کمک می‌کنند علاقه‌مندی‌های خود را سازمان‌دهی کنید." />
        )}
      </MediaCard>
    </section>
  );
}
