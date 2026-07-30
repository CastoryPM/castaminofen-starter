import { MediaCard } from '@/components/design-system/media/media-card';
import { Button } from '@/components/ui/button';
import { adminCreatorReviews } from '../data/mockAdminGovernanceData';

export function CreatorReviewPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Creator governance</p>
        <p className="text-sm text-text-secondary">A calm governance layer for application review, verification, reputation, and community impact.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {adminCreatorReviews.map((item) => (
          <MediaCard key={item.id} title={item.identity} subtitle={item.reputation} meta={item.status} className="space-y-3">
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{item.quality}</p>
              <p>{item.audience}</p>
              <p>{item.communityImpact}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="primary">Review</Button>
              <Button size="sm" variant="secondary">Verify</Button>
              <Button size="sm" variant="ghost">Flag</Button>
            </div>
          </MediaCard>
        ))}
      </div>
    </div>
  );
}

export default CreatorReviewPanel;
