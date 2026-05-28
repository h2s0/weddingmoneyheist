import type { ReactNode } from 'react';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { WidgetEmpty, WidgetError, WidgetLoading } from '@/components/widgets/WidgetState';
import { classNames } from '@/lib/classNames';
import { formatCompactCurrency, formatNumber, formatPercent } from '@/lib/formatters';
import type { Holding, MockAsyncState } from '@/types';

type HoldingsWidgetProps = {
  state: MockAsyncState<Holding[]>;
  action?: ReactNode;
};

export function HoldingsWidget({ state, action }: HoldingsWidgetProps) {
  return (
    <WidgetCard title="보유 종목" eyebrow="포트폴리오" icon="🛒" action={action} className="h-full">
      {state.status === 'loading' ? (
        <WidgetLoading title="보유 종목 로딩" description="종목 정보를 불러오는 중입니다." />
      ) : null}

      {state.status === 'error' ? (
        <WidgetError title="불러오지 못했어요" description={state.message} />
      ) : null}

      {state.status === 'empty' ? (
        <WidgetEmpty title="보유 종목이 없어요" description="종목을 보유하면 평가금액과 비중을 보여줍니다." />
      ) : null}

      {state.status === 'success' ? <HoldingsTable holdings={state.data} /> : null}
    </WidgetCard>
  );
}

function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <div className="min-w-[620px]">
        <div className="grid grid-cols-[1.5fr_0.9fr_0.9fr_0.8fr] gap-3 border-b border-border pb-2 text-caption font-semibold text-faint">
          <span>종목</span>
          <span className="text-right">평가액</span>
          <span className="text-right">수익률</span>
          <span className="text-right">비중</span>
        </div>

        {holdings.map((holding) => (
          <HoldingRow key={holding.id} holding={holding} />
        ))}
      </div>
    </div>
  );
}

function HoldingRow({ holding }: { holding: Holding }) {
  const isGain = holding.profit >= 0;

  return (
    <div className="grid grid-cols-[1.5fr_0.9fr_0.9fr_0.8fr] gap-3 border-b border-dashed border-border py-3 text-sm last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-[10px] font-display text-sm text-foreground"
          style={{ background: holding.colorToken }}
          aria-hidden="true"
        >
          {holding.name.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">{holding.name}</p>
          <p className="mt-1 truncate text-caption text-muted">
            {formatNumber(holding.shares)}주 · 평단 {formatNumber(holding.averagePrice)}원
          </p>
        </div>
      </div>

      <div className="min-w-0 text-right">
        <p className="font-semibold text-foreground">{formatCompactCurrency(holding.evaluationAmount)}</p>
        <p className="mt-1 text-caption text-muted">{formatNumber(holding.currentPrice)}원</p>
      </div>

      <div className="min-w-0 text-right">
        <p className={classNames('font-bold', isGain ? 'text-profit' : 'text-loss')}>
          {formatPercent(holding.profitRate)}
        </p>
        <p className={classNames('mt-1 text-caption', isGain ? 'text-profit' : 'text-loss')}>
          {isGain ? '+' : '−'}
          {formatCompactCurrency(Math.abs(holding.profit))}
        </p>
      </div>

      <div className="min-w-0 text-right">
        <p className="font-semibold text-foreground">{formatPercent(holding.weight).replace('+', '')}</p>
        <div className="mt-2 h-2 overflow-hidden rounded-pill bg-background-soft">
          <div
            className="h-full rounded-pill"
            style={{ width: `${holding.weight.toFixed(1)}%`, background: holding.accentToken }}
          />
        </div>
      </div>
    </div>
  );
}
