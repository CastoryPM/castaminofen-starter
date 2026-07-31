import { MediaCard } from '@/components/design-system/media/media-card';
import type { AdminAIActionSuggestion } from '../types/ai.types';

export function ActionSuggestionPanel({ suggestions }: { suggestions: AdminAIActionSuggestion[] }) {
  return (
    <MediaCard title="Action suggestion center" subtitle="Recommended actions" meta="Priority" className="space-y-3">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text-primary">{suggestion.title}</p>
            <span className="rounded-full border border-border/70 bg-surface-card/80 px-2.5 py-1 text-[11px] font-medium text-text-secondary">{suggestion.priority}</span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{suggestion.detail}</p>
        </div>
      ))}
    </MediaCard>
  );
}
