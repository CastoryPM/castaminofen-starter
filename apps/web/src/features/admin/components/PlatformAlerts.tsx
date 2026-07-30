import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import { adminPlatformAlerts } from '../data/mockAdminGovernanceData';

export function PlatformAlerts() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Platform alerts</p>
        <p className="text-sm text-text-secondary">Proactive monitoring UI for platform health, trust pressure, and creator momentum.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {adminPlatformAlerts.map((alert) => (
          <MediaCard key={alert.id} title={alert.title} subtitle={alert.detail} meta={alert.severity} className="space-y-3">
            <div className="flex gap-2">
              <Tag>{alert.severity}</Tag>
              <Tag>Monitoring</Tag>
            </div>
          </MediaCard>
        ))}
      </div>
    </div>
  );
}

export default PlatformAlerts;
