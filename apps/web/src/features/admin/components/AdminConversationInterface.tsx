import { MediaCard } from '@/components/design-system/media/media-card';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/design-system/common/chip';
import type { AdminAIConversationPrompt } from '../types/ai.types';

export function AdminConversationInterface({ prompts }: { prompts: AdminAIConversationPrompt[] }) {
  return (
    <MediaCard title="Admin AI conversation interface" subtitle="Mock conversational assistant" meta="Conversation" className="space-y-4">
      <div className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
        <p className="text-sm font-semibold text-text-primary">Admin:</p>
        <p className="mt-1 text-sm text-text-secondary">How is the platform doing?</p>
      </div>
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-3">
        <p className="text-sm font-semibold text-text-primary">Assistant:</p>
        <p className="mt-1 text-sm text-text-secondary">Overall health is positive. Community engagement increased, creator pacing remains stable, and there is a clear opportunity to support educational discovery.</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Suggested prompts</p>
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <Chip key={prompt.id}>{prompt.question}</Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="primary">Ask assistant</Button>
        <Button size="sm" variant="secondary">Save insight</Button>
      </div>
    </MediaCard>
  );
}
