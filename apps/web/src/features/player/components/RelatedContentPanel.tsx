import { MiniPlayer } from '@/components/design-system/player/mini-player';
import { Tag } from '@/components/design-system/common/tag';
import { MediaCard } from '@/components/design-system/media/media-card';

const relatedItems = [
  { title: 'جلسه‌ی آموزشی', subtitle: 'دنباله‌ی همین موضوع', badge: 'پیشنهاد' },
  { title: 'بحث جامعه', subtitle: 'گفت‌وگوی لحظه‌ای', badge: 'Community' },
  { title: 'مجموعه‌ی سازنده', subtitle: 'انتشارهای مرتبط', badge: 'Creator' },
];

export function RelatedContentPanel() {
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
