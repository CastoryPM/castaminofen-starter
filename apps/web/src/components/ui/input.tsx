import clsx from 'clsx';
import { forwardRef } from 'react';
import type { InputHTMLAttributes, DetailedHTMLProps } from 'react';

export const Input = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={clsx('input shadow-sm', className)} aria-invalid={props['aria-invalid'] ?? undefined} {...props} />;
  },
);

Input.displayName = 'Input';
