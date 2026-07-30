import clsx from 'clsx';
import type { ReactNode } from 'react';

export function ContentArtwork({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string;
  alt: string;
  fallback?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('relative overflow-hidden rounded-[1.35rem] border border-border/80 bg-surface-secondary shadow-sm', className)}>
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-accent">{fallback ?? alt.charAt(0).toUpperCase()}</div>}
    </div>
  );
}
