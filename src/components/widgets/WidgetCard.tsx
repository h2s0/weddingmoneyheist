import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Card } from '@/components/common/Card';
import { classNames } from '@/lib/classNames';

type WidgetCardProps = ComponentPropsWithoutRef<'section'> & {
  title: string;
  eyebrow?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function WidgetCard({
  title,
  eyebrow,
  icon,
  action,
  children,
  className,
  ...props
}: WidgetCardProps) {
  return (
    <Card className={classNames('flex min-h-56 flex-col overflow-hidden', className)} {...props}>
      <header className="flex items-center gap-3 px-widget-x pt-widget-y">
        {icon ? (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background-soft text-sm">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          {eyebrow ? <p className="text-caption font-semibold text-muted">{eyebrow}</p> : null}
          <h2 className="truncate font-display text-title font-semibold text-foreground">{title}</h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className="flex min-h-0 flex-1 flex-col px-widget-x py-widget-y">{children}</div>
    </Card>
  );
}
