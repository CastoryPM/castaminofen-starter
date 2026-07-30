import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export function CreatorBadge({ children, className, active = false }: HTMLAttributes<HTMLSpanElement> & { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]',
        active ? 'border-accent/30 bg-accent/10 text-accent' : 'border-border/70 bg-surface-secondary/80 text-text-secondary',
        className,
      )}
    >
      {children}
    </span>
  );
}
