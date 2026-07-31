import clsx from 'clsx';
import type { ReactNode } from 'react';

export function MobileHeader({
  title,
  subtitle,
  leading,
  trailing,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <header className={clsx('sticky top-0 z-30 border-b border-border/70 bg-surface-secondary/85 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.03)]', className)}>
      <div className="mx-auto flex w-full max-w-app items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          {leading ? <div className="shrink-0">{leading}</div> : null}
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{title}</p>
            {subtitle ? <p className="truncate text-sm text-text-secondary">{subtitle}</p> : null}
          </div>
        </div>
        {trailing ? <div className="flex shrink-0 items-center gap-1.5">{trailing}</div> : null}
      </div>
    </header>
  );
}
