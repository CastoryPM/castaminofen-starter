import { MiniPlayer } from '@/components/design-system/player/mini-player';
import { Tag } from '@/components/design-system/common/tag';
import { MediaCard } from '@/components/design-system/media/media-card';
import { getPlayerExperienceViewModel } from '../data/mockPlayerExperience';

export function RelatedContentPanel() {
  const { relatedItems } = getPlayerExperienceViewModel();

  return (
    <MediaCard title="محتوای مرتبط" subtitle="پیشنهاد برای ادامه‌ی تجربه" className="h-full">
      <div className="space-y-2">
        {relatedItems.map((item) => (
          <MiniPlayer key={item.title} title={item.title} subtitle={item.subtitle} actions={<Tag className="bg-surface-secondary text-text-secondary">{item.badge}</Tag>} />
        ))}
      </div>
    </MediaCard>
  );
}
