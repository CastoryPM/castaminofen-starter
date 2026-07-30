import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import { Button } from '@/components/ui/button';
import { adminContentReviews } from '../data/mockAdminGovernanceData';

export function ContentReviewPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Content review system</p>
        <p className="text-sm text-text-secondary">A premium review surface for podcasts, audiobooks, video, short-form, articles, and discussion threads.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {adminContentReviews.map((item) => (
          <MediaCard key={item.id} title={item.title} subtitle={item.creator} meta={item.visibility} className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Tag>{item.type}</Tag>
              <Tag>{item.category}</Tag>
              <Tag>{item.reports} reports</Tag>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="primary">Approve</Button>
              <Button size="sm" variant="secondary">Reject</Button>
              <Button size="sm" variant="ghost">Request Review</Button>
            </div>
          </MediaCard>
        ))}
      </div>
    </div>
  );
}

export default ContentReviewPanel;
