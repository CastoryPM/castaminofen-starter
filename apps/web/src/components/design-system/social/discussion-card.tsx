import clsx from 'clsx';
import type { ReactNode } from 'react';

type DiscussionCardProps = {
  title: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function DiscussionCard({ title, body, actions, children, className }: DiscussionCardProps) {
  return (
    <article className={clsx('rounded-[1.35rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft', className)}>
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          {body ? <div className="text-sm text-text-secondary">{body}</div> : null}
        </div>
        {children ? <div className="space-y-2">{children}</div> : null}
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </article>
  );
}
