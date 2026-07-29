"use client";

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import SearchPage from '@/features/search';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
}
