"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchInput from './components/SearchInput';
import { SearchResultsPanel } from './components/SearchResultsPanel';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeader } from '@/components/layout/section-header';

const DEFAULT_PAGE = 1;

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawQuery = searchParams.get('q') ?? '';
  const rawPage = Number(searchParams.get('page') ?? DEFAULT_PAGE);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : DEFAULT_PAGE;

  const [query, setQuery] = useState(rawQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(rawQuery);

  useEffect(() => {
    setQuery(rawQuery);
    setDebouncedQuery(rawQuery.trim());
  }, [rawQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [query]);

  const searchSummary = useMemo(() => {
    const value = debouncedQuery.trim();
    return value ? `نتایج برای «${value}»` : 'جستجو در پادکست‌ها و اپیزودها';
  }, [debouncedQuery]);

  const handleNavigate = (value: string) => {
    const nextValue = value.trim();
    setQuery(nextValue);

    const nextSearchParams = new URLSearchParams();
    if (nextValue) {
      nextSearchParams.set('q', nextValue);
    }
    nextSearchParams.set('page', String(DEFAULT_PAGE));

    const nextUrl = `/search${nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : ''}`;
    const currentQuery = searchParams.get('q') ?? '';
    const currentPage = searchParams.get('page') ?? String(DEFAULT_PAGE);

    if (currentQuery !== nextValue || currentPage !== String(DEFAULT_PAGE)) {
      router.replace(nextUrl, { scroll: false });
    }
  };

  return (
    <main className="page-container">
      <PageContainer>
        <section className="rounded-[2rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6 lg:p-8 space-y-6">
          <SectionHeader
            eyebrow="جستجو"
            title="پادکست‌ها و اپیزودهای موجود"
            description="به‌سرعت محتوای مورد نظر را در پلتفرم پیدا کنید."
          />

          <SearchInput
            defaultQuery={query}
            onNavigate={handleNavigate}
          />

          <div className="rounded-2xl border border-border/80 bg-surface-secondary/70 px-4 py-3 text-sm text-text-secondary">
            {searchSummary}
          </div>

          <SearchResultsPanel query={debouncedQuery} page={page} />
        </section>
      </PageContainer>
    </main>
  );
}
