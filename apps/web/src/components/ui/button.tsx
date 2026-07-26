import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import { createElement } from 'react';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

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

  return createElement(
    'button',
    {
      type,
      'aria-busy': loading || undefined,
      disabled: isDisabled,
      className: clsx(
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
      ),
      ...props,
    },
    loading ? createElement(LoaderCircle, { className: 'h-4 w-4 animate-spin', 'aria-hidden': 'true' }) : null,
    createElement('span', { className: 'truncate' }, children),
  );
}
