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
    <article
      className={clsx(
        'rounded-[1.35rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_14px_40px_rgba(11,14,28,0.16)]',
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <h3 className="truncate text-sm font-semibold text-text-primary">{title}</h3>
            {subtitle ? <p className="truncate text-sm text-text-secondary">{subtitle}</p> : null}
          </div>
          {meta ? (
            <div className="shrink-0 rounded-full border border-border/80 bg-surface-secondary/70 px-2.5 py-1 text-[11px] font-medium text-text-secondary">
              {meta}
            </div>
          ) : null}
        </div>
        {children ? <div className="space-y-2">{children}</div> : null}
      </div>
    </article>
  );
}
