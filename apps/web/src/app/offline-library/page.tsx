"use client";

import Link from 'next/link';
import SearchInput from '@/features/search/components/SearchInput';

export default function OfflineLibraryPage() {
  return (
    <main className="page-container items-center justify-center">
      <section className="card mx-auto flex w-full max-w-xl flex-col items-center gap-4 text-center">
        <p className="text-caption">Offline Library</p>
        <h1 className="text-heading">پادکست‌های آفلاین شما</h1>
        <p className="text-body m-0">در این نسخه‌ی MVP، این صفحه فقط ورود به کتابخانهٔ آفلاین را فراهم می‌کند.</p>

        <div className="w-full">
          <SearchInput
            defaultQuery=""
            onNavigate={(q) => (window.location.href = `/search?offline=1&q=${encodeURIComponent(q)}&page=1`)}
          />
        </div>

        <Link href="/library" className="text-sm font-medium text-accent transition hover:opacity-80">
          بازگشت به کتابخانه
        </Link>
      </section>
    </main>
  );
}
