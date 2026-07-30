import clsx from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export function IconButton({
  children,
  className,
  label,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children?: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={clsx('icon-button', className)}
      {...props}
    >
      {children}
    </button>
  );
}
