import { MediaCard } from '@/components/design-system/media/media-card';
import type { AdminAIInsightHistoryItem } from '../types/ai.types';

export function DecisionHistoryPanel({ history }: { history: AdminAIInsightHistoryItem[] }) {
  return (
    <MediaCard title="Decision history" subtitle="Previous insights" meta="History" className="space-y-3">
      {history.map((item) => (
        <div key={item.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text-primary">{item.recommendation}</p>
            <span className="rounded-full border border-border/70 bg-surface-card/80 px-2.5 py-1 text-[11px] font-medium text-text-secondary">{item.status}</span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{item.date}</p>
        </div>
      ))}
    </MediaCard>
  );
}
