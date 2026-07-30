'use client';

import type { ReactNode } from 'react';
import clsx from 'clsx';

export function ContentCarousel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}>
      {children}
    </div>
  );
}
