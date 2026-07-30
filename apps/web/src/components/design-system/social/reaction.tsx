import clsx from 'clsx';
import type { ReactNode } from 'react';

export function Reaction({ children, active = false, className }: { children: ReactNode; active?: boolean; className?: string }) {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-sm font-medium transition-all duration-200',
        active ? 'border-accent/30 bg-accent/10 text-accent' : 'border-border/70 bg-surface-secondary/80 text-text-secondary hover:border-accent/30 hover:text-accent',
        className,
      )}
    >
      {children}
    </button>
  );
}
