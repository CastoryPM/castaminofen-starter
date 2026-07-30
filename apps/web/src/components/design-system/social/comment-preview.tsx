import clsx from 'clsx';
import type { ReactNode } from 'react';

export function CommentPreview({ title, body, meta, className }: { title: ReactNode; body?: ReactNode; meta?: ReactNode; className?: string }) {
  return (
    <div className={clsx('rounded-[1.15rem] border border-border/70 bg-surface-secondary/70 p-3', className)}>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {body ? <p className="text-sm text-text-secondary">{body}</p> : null}
        {meta ? <p className="text-xs uppercase tracking-[0.2em] text-accent">{meta}</p> : null}
      </div>
    </div>
  );
}
