'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { getBottomNavigationItems } from '@/components/layout/app-shell-config';

export function BottomNavigation({ pathname }: { pathname: string }) {
  const items = getBottomNavigationItems(pathname);

  return (
    <nav className="bottom-navigation fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-surface-secondary/90 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] backdrop-blur-2xl" aria-label="منوی اصلی">
      <div className="mx-auto flex max-w-app items-end justify-between gap-1.5 px-2 pb-2 pt-2 sm:px-4 sm:pt-3">
        {items.map((item) => {
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.isActive ? 'page' : undefined}
                className="group flex min-w-[3.75rem] flex-1 items-center justify-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-accent text-white shadow-[0_10px_28px_rgba(119,108,254,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(119,108,254,0.34)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.isActive ? 'page' : undefined}
              className={clsx(
                'group flex min-h-[3.35rem] min-w-[3.35rem] flex-1 flex-col items-center justify-center gap-1 rounded-[1rem] px-2 py-2 text-center text-[11px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary',
                item.isActive
                  ? 'bg-accent/12 text-accent shadow-sm'
                  : 'text-text-secondary hover:bg-surface-primary hover:text-text-primary',
              )}
            >
              <Icon className={clsx('h-5 w-5 transition-transform duration-200', item.isActive && 'scale-110')} aria-hidden="true" />
              <span className="truncate leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
