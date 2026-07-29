"use client";

import { Search as SearchIcon, X as XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchInput({ defaultQuery, onNavigate }: { defaultQuery?: string; onNavigate: (q: string) => void }) {
  const [value, setValue] = useState(defaultQuery ?? '');

  useEffect(() => {
    setValue(defaultQuery ?? '');
  }, [defaultQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNavigate(value.trim());
  };

  const clearValue = () => {
    setValue('');
    onNavigate('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-field" aria-label="فرم جستجو">
      <label htmlFor="search" className="form-label">
        جستجو در پادکست‌ها و اپیزودها
      </label>
      <p className="text-caption m-0">برای رسیدن سریع به محتوای موردنظر، عنوان پادکست یا اپیزود را وارد کنید.</p>
      <div className="rounded-[1.5rem] border border-border/80 bg-surface-secondary/70 p-3 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <Input
              id="search"
              value={value}
              onChange={(event) => {
                const nextValue = event.target.value;
                setValue(nextValue);
                onNavigate(nextValue.trim());
              }}
              placeholder="مثلاً فناوری، داستان، آموزش"
              className="w-full pr-11"
              autoComplete="off"
              spellCheck={false}
              aria-label="عبارت جستجو"
              aria-describedby="search-helper"
            />
            {value.trim() ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full p-0"
                onClick={clearValue}
                aria-label="پاک کردن عبارت جستجو"
              >
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : null}
          </div>
          <Button className="min-h-[3rem] justify-center sm:min-w-[8.5rem]" type="submit" disabled={!value.trim()}>
            جستجو
          </Button>
        </div>
      </div>
      <p id="search-helper" className="text-caption m-0">نتایج به‌صورت خودکار بر اساس عنوان، ناشر و توضیحات مرتب می‌شوند.</p>
    </form>
  );
}
