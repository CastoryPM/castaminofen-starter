'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="app-header sticky top-0 z-30 border-b border-border/70 bg-surface-secondary/80 backdrop-blur-2xl">
      <div className="mobile-container mx-auto flex w-full max-w-app items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Image src="/branding/logo.png" alt="Castaminofen" width={220} height={56} className="h-auto w-auto max-w-[180px] sm:max-w-[220px]" />
          <div className="hidden sm:block">
            <p className="text-caption uppercase tracking-[0.24em] text-text-secondary">Castaminofen</p>
            <h1 className="text-heading">پخش و کشف صوتی</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/search" className="icon-button" aria-label="جستجو در پادکست‌ها">
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link href="/settings" className="icon-button" aria-label="تنظیمات برنامه">
            <Settings className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
