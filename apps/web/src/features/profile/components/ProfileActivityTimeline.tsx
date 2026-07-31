import { MediaCard } from '@/components/design-system/media/media-card';
import { UserActivityCard } from '@/features/social/components/UserActivityCard';
import type { ProfileActivityItem } from '../types/profile.types';

type ProfileActivityTimelineProps = {
  activities: ProfileActivityItem[];
};

export function ProfileActivityTimeline({ activities }: ProfileActivityTimelineProps) {
  const contributions = activities.map((activity) => ({
    id: activity.id,
    label: activity.label,
    value: activity.value,
    detail: activity.detail,
  }));

  return (
    <MediaCard title="Recent Return Story" subtitle="روایت شخصی از حضور، بازگشت و مشارکت در پلتفرم" meta="Activity" className="space-y-3">
      <UserActivityCard contributions={contributions} />
    </MediaCard>
  );
}
