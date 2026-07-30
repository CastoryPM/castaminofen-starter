import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';

export function Avatar({
  className,
  alt,
  fallback,
  size = 'md',
  src,
  ...props
}: Omit<ComponentProps<'img'>, 'alt' | 'src'> & {
  alt: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  src?: string;
}) {
  const sizeClassName = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-14 w-14 text-base',
  }[size];

  if (!src) {
    return (
      <div className={clsx('inline-flex items-center justify-center rounded-full border border-border bg-surface-secondary font-semibold text-text-primary shadow-sm', sizeClassName, className)}>
        {fallback ?? alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={clsx('inline-flex overflow-hidden rounded-full border border-border bg-surface-secondary shadow-sm', sizeClassName, className)}>
      <img src={src} alt={alt} className="h-full w-full object-cover" {...props} />
    </div>
  );
}
