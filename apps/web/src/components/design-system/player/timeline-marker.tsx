import clsx from 'clsx';
import type { ReactNode } from 'react';

export function TimelineMarker({ label, active = false, className }: { label: ReactNode; active?: boolean; className?: string }) {
  return (
    <div className={clsx('rounded-full border px-2.5 py-1 text-[11px] font-medium', active ? 'border-accent/30 bg-accent/10 text-accent' : 'border-border/70 bg-surface-secondary/80 text-text-secondary', className)}>
      {label}
    </div>
  );
}
