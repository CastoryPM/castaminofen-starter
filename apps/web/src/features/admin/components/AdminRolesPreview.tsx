import { MediaCard } from '@/components/design-system/media/media-card';
import { adminRolePreviews } from '../data/mockAdminGovernanceData';

export function AdminRolesPreview() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Admin roles preview</p>
        <p className="text-sm text-text-secondary">Future-ready UI foundation for owner, administrator, moderator, and content-manager responsibilities.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {adminRolePreviews.map((role) => (
          <MediaCard key={role.id} title={role.role} subtitle={role.scope} meta="UI only" className="space-y-2" />
        ))}
      </div>
    </div>
  );
}

export default AdminRolesPreview;
