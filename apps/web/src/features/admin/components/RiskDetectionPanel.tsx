import { MediaCard } from '@/components/design-system/media/media-card';
import { Chip } from '@/components/design-system/common/chip';
import type { AdminAIRisk } from '../types/ai.types';

const severityMap = {
  high: 'border-red-500/30 bg-red-500/10 text-red-500',
  medium: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
  low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
};

export function RiskDetectionPanel({ risks }: { risks: AdminAIRisk[] }) {
  return (
    <MediaCard title="Risk detection" subtitle="Proactive issue detection" meta="Decision intelligence" className="space-y-3">
      {risks.map((risk) => (
        <div key={risk.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text-primary">{risk.title}</p>
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${severityMap[risk.severity]}`}>{risk.severity}</span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{risk.explanation}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Suggested action</Chip>
            <span className="text-sm text-text-secondary">{risk.suggestedAction}</span>
          </div>
        </div>
      ))}
    </MediaCard>
  );
}
