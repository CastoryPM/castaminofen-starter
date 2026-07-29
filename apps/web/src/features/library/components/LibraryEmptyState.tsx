'use client';

import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function LibraryEmptyState({
  title,
  description,
  actionLabel = 'مشاهده پادکست‌ها',
  eyebrow,
  icon: Icon = Sparkles,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  eyebrow?: string;
  icon?: LucideIcon;
}) {
  return (
    <EmptyState
      className="border border-border/80 bg-surface-primary/90 p-6 shadow-soft sm:p-8"
      title={title}
      description={description}
      eyebrow={eyebrow}
      icon={Icon}
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
