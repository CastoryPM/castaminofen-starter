'use client';

import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function LibraryEmptyState({
  title,
  description,
  actionLabel = 'مشاهده پادکست‌ها',
  eyebrow,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  eyebrow?: string;
}) {
  return (
    <EmptyState
      className="border border-border/80 bg-surface-primary/90 p-6 shadow-soft sm:p-8"
      title={title}
      description={description}
      eyebrow={eyebrow}
      action={
        <Link href="/podcasts" className="inline-flex">
          <Button variant="primary" size="sm">
            {actionLabel}
          </Button>
        </Link>
      }
    />
  );
}
