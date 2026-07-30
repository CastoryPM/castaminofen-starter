import clsx from 'clsx';
import type { ReactNode } from 'react';

export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={clsx('space-y-4 sm:space-y-6 lg:space-y-8', className)}>
      {children}
    </section>
  );
}
