'use client';

import type { ReactNode } from 'react';
import clsx from 'clsx';

export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={clsx('space-y-4 sm:space-y-6', className)}>
      {children}
    </section>
  );
}
