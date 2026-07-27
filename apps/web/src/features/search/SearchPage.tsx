"use client";

import { useEffect, useState } from 'react';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';

type SearchParams = {
  q: string;
  page: number;
};

export default function SearchPage() {
  const [params, setParams] = useState<SearchParams | null>(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get('q') ?? '';
    const page = Number(searchParams.get('page') ?? '1') || 1;
    const offlineFlag = searchParams.get('offline') === '1' || searchParams.get('offline') === 'true';
    setOffline(offlineFlag);
    setParams({ q, page });
  }, []);

  return (
    <main className="page-container">
      <section className="card space-y-6">
        <div className="space-y-2">
          <h1 className="text-heading">{offline ? 'جستجوی آفلاین' : 'جستجو'}</h1>
          <p className="text-body m-0">{offline ? 'جستجو فقط در کتابخانهٔ آفلاین شما انجام می‌شود.' : 'برای کشف پادکست‌های جدید، عنوان، توضیحات یا نام پادکست را وارد کنید.'}</p>
        </div>

        <SearchInput
          defaultQuery={params?.q ?? ''}
          onNavigate={(newQ) => (window.location.href = `/search?offline=${offline ? '1' : '0'}&q=${encodeURIComponent(newQ)}&page=1`)}
        />

        {params ? <SearchResults q={params.q} page={params.page} /> : null}
      </section>
    </main>
  );
}
