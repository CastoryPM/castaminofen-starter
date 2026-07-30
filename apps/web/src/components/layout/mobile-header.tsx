'use client';

import Link from 'next/link';
import { Bell, Search, Sparkles, UserRound } from 'lucide-react';
import { getMobileHeaderConfig } from '@/components/layout/app-shell-config';

export function MobileHeader({ pathname }: { pathname: string }) {
  const config = getMobileHeaderConfig(pathname);

  return (
    <header className="app-header sticky top-0 z-30 border-b border-border/70 bg-surface-secondary/80 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-app items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/12 text-accent shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-text-secondary">{config.title}</p>
            <p className="truncate text-sm text-text-secondary">{config.tagline}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {config.showSearchAction ? (
            <Link href="/search" className="icon-button" aria-label="جستجو در پادکست‌ها">
              <Search className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
          {config.showNotificationAction ? (
            <Link href="/settings" className="icon-button relative" aria-label="تنظیمات برنامه">
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
            </Link>
          ) : null}
          {config.showProfileAction ? (
            <Link href="/profile" className="icon-button" aria-label="پروفایل کاربری">
              <UserRound className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
