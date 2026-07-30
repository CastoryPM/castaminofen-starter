import clsx from 'clsx';
import type { ReactNode } from 'react';

export function MiniPlayer({ title, subtitle, actions, className }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex items-center justify-between gap-3 rounded-[1.35rem] border border-border/80 bg-surface-secondary/90 px-3 py-3 shadow-soft', className)}>
      <div className="min-w-0 space-y-1">
        <p className="truncate text-sm font-semibold text-text-primary">{title}</p>
        {subtitle ? <p className="truncate text-sm text-text-secondary">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
