'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LibraryCollectionCard({
  title,
  description,
  eyebrow,
  actionLabel,
  href,
  badge,
}: {
  title: string;
  description: string;
  eyebrow: string;
  actionLabel: string;
  href?: string;
  badge?: string;
}) {
  const content = (
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-4 shadow-sm transition-all duration-200 hover:border-accent/30 hover:bg-surface-primary">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-xs text-text-secondary">
          {eyebrow}
        </span>
        {badge ? (
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-xs text-text-secondary">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        <p className="m-0 text-sm leading-7 text-text-secondary">{description}</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-text-secondary">به‌زودی</span>
        {href ? (
          <Link href={href} className="inline-flex min-h-[2.5rem] items-center text-sm font-medium text-accent">
            {actionLabel}
          </Link>
        ) : (
          <Button variant="secondary" size="sm" disabled aria-label={actionLabel}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );

  return href ? <Link href={href} className="block">{content}</Link> : content;
}
