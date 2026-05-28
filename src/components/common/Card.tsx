import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '@/lib/classNames';

type CardProps = ComponentPropsWithoutRef<'section'> & {
  variant?: 'default' | 'soft' | 'dashed';
};

const cardVariants = {
  default: 'border-border bg-card shadow-card',
  soft: 'border-border bg-card-soft shadow-soft',
  dashed: 'border-border bg-card shadow-card border-dashed',
} as const;

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <section
      className={classNames(
        'rounded-card border text-foreground transition-colors duration-300',
        cardVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={classNames('flex flex-col gap-2 p-widget-x pb-0', className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      className={classNames('font-display text-title font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={classNames('text-body text-muted', className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={classNames('p-widget-x', className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={classNames('flex items-center gap-3 border-t border-border px-widget-x py-widget-y', className)}
      {...props}
    />
  );
}

export type CardAction = {
  label: string;
  content: ReactNode;
};
