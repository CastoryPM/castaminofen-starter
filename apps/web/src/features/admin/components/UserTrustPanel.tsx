import { MediaCard } from '@/components/design-system/media/media-card';
import { Button } from '@/components/ui/button';
import { adminTrustUsers } from '../data/mockAdminGovernanceData';

export function UserTrustPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">User trust management</p>
        <p className="text-sm text-text-secondary">Operational view for account health, reports, contribution history, and community behavior.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {adminTrustUsers.map((user) => (
          <MediaCard key={user.id} title={user.name} subtitle={user.behavior} meta={`${user.reports} reports`} className="space-y-3">
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{user.activity}</p>
              <p>{user.contributions}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="secondary">View profile</Button>
              <Button size="sm" variant="ghost">Review activity</Button>
              <Button size="sm" variant="secondary">Restrict placeholder</Button>
            </div>
          </MediaCard>
        ))}
      </div>
    </div>
  );
}

export default UserTrustPanel;
