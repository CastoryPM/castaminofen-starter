"use client";

import { useEffect, useMemo, useState } from 'react';
import SearchInput from './components/SearchInput';
import { SearchResultsPanel } from './components/SearchResultsPanel';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

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

  return (
    <main className="page-container">
      <section className="card space-y-6">
        <div className="space-y-2">
          <h1 className="text-heading">جستجو</h1>
          <p className="text-body m-0">به‌سرعت پادکست‌ها و اپیزودهای موجود را در پلتفرم پیدا کنید.</p>
        </div>

        <SearchInput
          defaultQuery={query}
          onNavigate={(value) => setQuery(value)}
        />

        <div className="rounded-2xl border border-border/80 bg-surface-secondary/70 px-4 py-3 text-sm text-text-secondary">
          {searchSummary}
        </div>

        <SearchResultsPanel query={debouncedQuery} />
      </section>
    </main>
  );
}
