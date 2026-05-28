import type { ButtonHTMLAttributes } from 'react';
import { classNames } from '@/lib/classNames';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-foreground text-card hover:translate-y-[-1px]',
  secondary: 'border-border bg-card text-foreground hover:bg-card-soft',
  ghost: 'border-transparent bg-transparent text-muted hover:bg-background-soft hover:text-foreground',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-caption',
  md: 'h-11 px-4 text-sm',
};

export function Button({
  className,
  variant = 'secondary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        'inline-flex items-center justify-center gap-2 rounded-pill border font-semibold shadow-soft transition duration-150 disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}
