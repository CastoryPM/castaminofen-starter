import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface DesktopNavigationItem {
  id: string;
  label: ReactNode;
  href: string;
  active?: boolean;
}

export function DesktopNavigation({ items, className }: { items: DesktopNavigationItem[]; className?: string }) {
  return (
    <nav className={clsx('flex items-center gap-2', className)} aria-label="ناوبری دسکتاپ">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          aria-current={item.active ? 'page' : undefined}
          className={clsx(
            'rounded-full px-3 py-2 text-sm font-medium transition-all duration-200',
            item.active ? 'bg-accent/12 text-accent' : 'text-text-secondary hover:bg-surface-card hover:text-text-primary',
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
