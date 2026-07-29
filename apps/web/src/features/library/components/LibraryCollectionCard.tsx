'use client';

import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LibraryCollectionCard({
  title,
  description,
  eyebrow,
  actionLabel,
  href,
  badge,
  icon: Icon,
  iconClassName,
  badgeClassName,
  statusLabel,
}: {
  title: string;
  description: string;
  eyebrow: string;
  actionLabel: string;
  href?: string;
  badge?: string;
  icon: LucideIcon;
  iconClassName: string;
  badgeClassName: string;
  statusLabel: string;
}) {
  const content = (
    <div className="flex h-full flex-col gap-4 rounded-[1.6rem] border border-border/80 bg-gradient-to-br from-surface-primary to-surface-secondary/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className={clsx('flex h-11 w-11 items-center justify-center rounded-2xl border', iconClassName)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <span className="inline-flex w-fit items-center rounded-full border border-border/70 bg-surface-primary px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-text-secondary">
            {eyebrow}
          </span>
          {badge ? (
            <span className={clsx('inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] font-medium', badgeClassName)}>
              {badge}
            </span>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        <p className="m-0 text-sm leading-7 text-text-secondary">{description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="text-sm text-text-secondary">{statusLabel}</span>
        {href ? (
          <span className="inline-flex min-h-[2.5rem] items-center gap-1 text-sm font-medium text-accent">
            {actionLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : (
          <Button variant="secondary" size="sm" disabled aria-label={actionLabel}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary">
      {content}
    </Link>
  ) : content;
}
