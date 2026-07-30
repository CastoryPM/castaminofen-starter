import { ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { EmptyState } from '@/components/design-system/states/empty-state';
import { LoadingState } from '@/components/design-system/states/loading-state';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import { Chip } from '@/components/design-system/common/chip';
import { Button } from '@/components/ui/button';
import { adminGovernanceMetrics, adminGovernanceOperations, adminGovernanceTrustSignals } from '../data/mockAdminGovernanceData';

export function AdminGovernanceDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">Governance Mission Control</p>
              <p className="text-sm text-text-secondary">Premium operational overview for trust, safety, and ecosystem health</p>
            </div>
            <Tag className="border-accent/20 bg-accent/10 text-accent">Operational intelligence</Tag>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {adminGovernanceMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-xs text-text-secondary">{metric.label}</p>
                <p className="mt-2 text-lg font-semibold text-text-primary">{metric.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-accent/10 p-2 text-accent">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Trust signals</p>
              <p className="text-sm text-text-secondary">Signals that need attention</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {adminGovernanceTrustSignals.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-sm font-semibold text-text-primary">{item.label}</p>
                <p className="text-sm text-text-secondary">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <MediaCard title="Operational summary" subtitle="What needs attention today" meta="Live" className="space-y-3">
          <div className="grid gap-3 md:grid-cols-3">
            {adminGovernanceOperations.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-xs text-text-secondary">{item.label}</p>
                <p className="mt-2 font-semibold text-text-primary">{item.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
              </div>
            ))}
          </div>
        </MediaCard>
        <MediaCard title="Review posture" subtitle="Situation-ready workflow surfaces" meta="Prepared" className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Chip active>Pending reviews</Chip>
            <Chip>Creator verification</Chip>
            <Chip>Community triage</Chip>
          </div>
          <div className="rounded-2xl border border-dashed border-border/80 bg-surface-secondary/80 p-4">
            <LoadingState title="Loading operational data" message="Preparing the latest governance view" />
          </div>
        </MediaCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-accent/10 p-2 text-accent">
              <Waves className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Community readiness</p>
              <p className="text-sm text-text-secondary">Healthy ecosystem heartbeat</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-border/70 bg-surface-secondary/70 p-4">
            <p className="text-sm font-medium text-text-primary">High confidence in engagement consistency</p>
            <p className="mt-2 text-sm text-text-secondary">Traffic, creator activity, and discussion quality are holding steady.</p>
          </div>
        </div>
        <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-accent/10 p-2 text-accent">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Escalation posture</p>
              <p className="text-sm text-text-secondary">Calm but responsive operating mode</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary">Review queue</Button>
            <Button size="sm" variant="primary">Open alerts</Button>
          </div>
        </div>
      </div>

      <div className="rounded-[1.4rem] border border-dashed border-border/80 bg-surface-secondary/80 p-4">
        <EmptyState title="No pending reviews" description="The governance workspace is prepared for the next review wave." />
      </div>
    </div>
  );
}

export default AdminGovernanceDashboard;
