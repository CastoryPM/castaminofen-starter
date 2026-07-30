import { MediaCard } from '@/components/design-system/media/media-card';
import { adminOperationsTasks } from '../data/mockAdminGovernanceData';

export function OperationsDashboard() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Operations dashboard</p>
        <p className="text-sm text-text-secondary">Daily operations workspace for tasks, reviews, activity, and alerts.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <MediaCard title="Today&apos;s tasks" subtitle="What needs attention" meta="Priority" className="space-y-3">
          {adminOperationsTasks.map((task) => (
            <div key={task.id} className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
              <p className="font-semibold text-text-primary">{task.title}</p>
              <p className="mt-1 text-sm text-text-secondary">{task.detail}</p>
              <p className="mt-2 text-sm text-accent">{task.status}</p>
            </div>
          ))}
        </MediaCard>
        <MediaCard title="Pending reviews" subtitle="Review surfaces in motion" meta="Live" className="space-y-3">
          <div className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
            <p className="font-semibold text-text-primary">Creator review queue</p>
            <p className="mt-1 text-sm text-text-secondary">Three applications are moving through governance.</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
            <p className="font-semibold text-text-primary">Recent activity</p>
            <p className="mt-1 text-sm text-text-secondary">A new community flag and several content reports were surfaced today.</p>
          </div>
        </MediaCard>
      </div>
    </div>
  );
}

export default OperationsDashboard;
