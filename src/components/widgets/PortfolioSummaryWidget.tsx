import type { ReactNode } from 'react';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { WidgetEmpty, WidgetError, WidgetLoading } from '@/components/widgets/WidgetState';
import { classNames } from '@/lib/classNames';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import type { MockAsyncState, PortfolioSummary } from '@/types';

type PortfolioSummaryWidgetProps = {
  state: MockAsyncState<PortfolioSummary>;
  action?: ReactNode;
};

export function PortfolioSummaryWidget({ state, action }: PortfolioSummaryWidgetProps) {
  return (
    <WidgetCard title="아빠 자산" eyebrow="포트폴리오" icon="💰" action={action} className="h-full">
      {state.status === 'loading' ? (
        <WidgetLoading title="자산 요약 로딩" description="자산 정보를 불러오는 중입니다." />
      ) : null}

      {state.status === 'error' ? (
        <WidgetError title="불러오지 못했어요" description={state.message} />
      ) : null}

      {state.status === 'empty' ? (
        <WidgetEmpty title="아직 자산 정보가 없어요" description="첫 포트폴리오 데이터가 들어오면 여기에 보여줍니다." />
      ) : null}

      {state.status === 'success' ? <PortfolioSummaryContent summary={state.data} /> : null}
    </WidgetCard>
  );
}

function PortfolioSummaryContent({ summary }: { summary: PortfolioSummary }) {
  const isGain = summary.totalProfit >= 0;
  const profitTone = isGain
    ? 'bg-profit-background text-profit'
    : 'bg-loss-background text-loss';

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between gap-6">
      <div>
        <p className="text-caption font-semibold text-muted">총 평가금액</p>
        <p className="mt-2 break-keep font-display text-[clamp(2rem,4vw,2.625rem)] leading-tight text-foreground">
          {formatCurrency(summary.currentValue)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className={classNames('rounded-pill px-3 py-1 text-caption font-semibold', profitTone)}>
            {isGain ? '▲' : '▼'} {formatCurrency(Math.abs(summary.totalProfit))}
          </span>
          <span className={classNames('rounded-pill px-3 py-1 text-caption font-semibold', profitTone)}>
            {formatPercent(summary.totalProfitRate)}
          </span>
          <span className="rounded-pill bg-background-soft px-3 py-1 text-caption font-semibold text-muted">
            원금 대비
          </span>
        </div>
      </div>

      <div className="grid gap-3 border-t border-dashed border-border pt-4 sm:grid-cols-2">
        <SummaryMetric label="원금" value={formatCurrency(summary.principal)} />
        <SummaryMetric label="예수금" value={formatCurrency(summary.cash)} />
      </div>
    </div>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-caption text-muted">{label}</p>
      <p className="mt-1 text-body-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
