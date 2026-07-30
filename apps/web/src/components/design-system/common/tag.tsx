import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export function Tag({ children, className }: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full border border-border/70 bg-surface-card/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-text-secondary', className)}>
      {children}
    </span>
  );
}
