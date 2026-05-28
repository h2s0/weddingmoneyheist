type WidgetStateProps = {
  title: string;
  description: string;
};

export function WidgetLoading({ title, description }: WidgetStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
      <div className="h-4 w-24 animate-pulse rounded-pill bg-background-soft" aria-hidden="true" />
      <div className="h-9 w-48 animate-pulse rounded-pill bg-background-soft" aria-hidden="true" />
      <p className="text-body text-muted">
        <span className="sr-only">{title}</span>
        {description}
      </p>
    </div>
  );
}

export function WidgetEmpty({ title, description }: WidgetStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center rounded-soft border border-dashed border-border bg-background-soft px-4 py-5">
      <p className="font-display text-title font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-body text-muted">{description}</p>
    </div>
  );
}

export function WidgetError({ title, description }: WidgetStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center rounded-soft border border-dashed border-loss bg-loss-background px-4 py-5">
      <p className="font-display text-title font-semibold text-loss">{title}</p>
      <p className="mt-2 text-body text-muted">{description}</p>
    </div>
  );
}
