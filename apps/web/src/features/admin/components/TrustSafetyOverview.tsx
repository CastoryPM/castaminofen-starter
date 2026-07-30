import { MediaCard } from '@/components/design-system/media/media-card';
import { adminTrustHealthMetrics } from '../data/mockAdminGovernanceData';

export function TrustSafetyOverview() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Trust &amp; safety overview</p>
        <p className="text-sm text-text-secondary">A calm trust-health layer focused on ecosystem readiness rather than security operations.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {adminTrustHealthMetrics.map((metric) => (
          <MediaCard key={metric.label} title={metric.label} subtitle={metric.detail} meta={metric.value} className="space-y-2" />
        ))}
      </div>
    </div>
  );
}

export default TrustSafetyOverview;
