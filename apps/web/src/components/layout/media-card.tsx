'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

export function MediaCard({
  title,
  subtitle,
  meta,
  children,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <article className={clsx('rounded-[1.25rem] border border-border/80 bg-surface-card/80 p-4 shadow-soft', className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <h3 className="truncate text-sm font-semibold text-text-primary">{title}</h3>
            {subtitle ? <p className="truncate text-sm text-text-secondary">{subtitle}</p> : null}
          </div>
          {meta ? <div className="shrink-0 text-xs text-text-secondary">{meta}</div> : null}
        </div>
        {children ? <div className="space-y-2">{children}</div> : null}
      </div>
    </article>
  );
}
