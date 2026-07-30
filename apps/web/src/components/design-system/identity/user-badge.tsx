import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export function UserBadge({
  children,
  className,
  tone = 'default',
}: HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: 'default' | 'accent' | 'success';
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide shadow-sm',
        tone === 'accent' && 'border-accent/30 bg-accent/10 text-accent',
        tone === 'success' && 'border-success/30 bg-success/10 text-success',
        tone === 'default' && 'border-border bg-surface-secondary text-text-secondary',
        className,
      )}
    >
      {children}
    </span>
  );
}
