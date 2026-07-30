import clsx from 'clsx';
import type { ReactNode } from 'react';

export function MediaCarousel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex gap-3 overflow-x-auto pb-1', className)}>
      {children}
    </div>
  );
}
