import clsx from 'clsx';
import { useMemo, useState } from 'react';
import type { SocialReaction, SocialReactionType } from '../types/social.types';

const reactionLabels: Record<SocialReactionType, string> = {
  like: 'Like',
  insightful: 'Insightful',
  interesting: 'Interesting',
  agree: 'Agree',
  question: 'Question',
  love: 'Love',
};

const reactionIcons: Record<SocialReactionType, string> = {
  like: '👍',
  insightful: '💡',
  interesting: '✨',
  agree: '🙌',
  question: '❓',
  love: '❤️',
};

type ReactionBarProps = {
  reactions: SocialReaction[];
  selectedType?: SocialReactionType;
  onToggle?: (type: SocialReactionType) => void;
  className?: string;
};

export function ReactionBar({ reactions, selectedType, onToggle, className }: ReactionBarProps) {
  const [activeType, setActiveType] = useState<SocialReactionType | undefined>(selectedType);

  const options = useMemo(() => reactions.map((reaction) => ({ ...reaction, label: reactionLabels[reaction.type] })), [reactions]);

  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {options.map((reaction) => {
        const isActive = activeType === reaction.type || reaction.userReacted;

        return (
          <button
            key={reaction.type}
            type="button"
            aria-pressed={isActive}
            className={clsx(
              'inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-sm font-medium transition-all duration-200',
              isActive ? 'border-accent/30 bg-accent/10 text-accent' : 'border-border/70 bg-surface-secondary/80 text-text-secondary hover:border-accent/30 hover:text-accent',
            )}
            onClick={() => {
              const nextType = activeType === reaction.type ? undefined : reaction.type;
              setActiveType(nextType);
              onToggle?.(reaction.type);
            }}
          >
            <span>{reactionIcons[reaction.type]}</span>
            <span>{reaction.label}</span>
            <span className="text-xs opacity-80">{reaction.count}</span>
          </button>
        );
      })}
    </div>
  );
}
