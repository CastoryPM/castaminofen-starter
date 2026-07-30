import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled,
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={clsx(
        'button shadow-sm',
        {
          'button-primary': variant === 'primary',
          'button-secondary': variant === 'secondary',
          'button-ghost': variant === 'ghost',
          'px-3 py-2 text-xs': size === 'sm',
          'px-4 py-3 text-sm': size === 'md',
          'px-5 py-4 text-base': size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      <span className="truncate">{children as ReactNode}</span>
    </button>
  );
}
