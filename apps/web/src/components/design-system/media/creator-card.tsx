import clsx from 'clsx';
import type { ReactNode } from 'react';

export function CreatorCard({
  name,
  subtitle,
  children,
  className,
}: {
  name: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <article className={clsx('rounded-[1.35rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-text-primary">{name}</h3>
          {subtitle ? <p className="text-sm text-text-secondary">{subtitle}</p> : null}
        </div>
        {children ? <div className="shrink-0">{children}</div> : null}
      </div>
    </article>
  );
}
