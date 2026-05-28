import { useMemo, useState, type ReactNode } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts';
import { Button } from '@/components/common/Button';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { WidgetEmpty, WidgetError, WidgetLoading } from '@/components/widgets/WidgetState';
import { formatCurrency, formatDate, formatPercent } from '@/lib/formatters';
import type { EquityCurvePoint, MockAsyncState } from '@/types';

type EquityCurveWidgetProps = {
  state: MockAsyncState<EquityCurvePoint[]>;
  action?: ReactNode;
};

type RangeKey = 'week' | 'month' | 'quarter' | 'all';

const ranges: { key: RangeKey; label: string; days: number | null }[] = [
  { key: 'week', label: '1주', days: 7 },
  { key: 'month', label: '1개월', days: 31 },
  { key: 'quarter', label: '3개월', days: 93 },
  { key: 'all', label: '전체', days: null },
];

export function EquityCurveWidget({ state, action }: EquityCurveWidgetProps) {
  const [range, setRange] = useState<RangeKey>('month');

  return (
    <WidgetCard title="수익률 추이" eyebrow="차트" icon="📈" action={action} className="h-full">
      {state.status === 'loading' ? (
        <WidgetLoading title="차트 로딩" description="수익률 추이를 불러오는 중입니다." />
      ) : null}

      {state.status === 'error' ? (
        <WidgetError title="불러오지 못했어요" description={state.message} />
      ) : null}

      {state.status === 'empty' ? (
        <WidgetEmpty title="차트 데이터가 없어요" description="평가금액 기록이 쌓이면 추이를 보여줍니다." />
      ) : null}

      {state.status === 'success' ? (
        <EquityCurveContent data={state.data} range={range} onRangeChange={setRange} />
      ) : null}
    </WidgetCard>
  );
}

function EquityCurveContent({
  data,
  range,
  onRangeChange,
}: {
  data: EquityCurvePoint[];
  range: RangeKey;
  onRangeChange: (range: RangeKey) => void;
}) {
  const filteredData = useMemo(() => filterDataByRange(data, range), [data, range]);
  const latestPoint = filteredData.at(-1);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-2xl font-semibold text-foreground">
            {latestPoint ? formatPercent(latestPoint.profitRate) : '–'}
          </p>
          <p className="mt-1 text-caption text-muted">평가금액 기준 수익률</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {ranges.map((item) => (
            <Button
              key={item.key}
              size="sm"
              variant={range === item.key ? 'secondary' : 'ghost'}
              onClick={() => {
                onRangeChange(item.key);
              }}
              aria-pressed={range === item.key}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%" minHeight={150}>
          <LineChart data={filteredData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 5" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: 'var(--color-muted)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={20}
            />
            <YAxis hide domain={['dataMin - 100000', 'dataMax + 100000']} />
            <Tooltip
              content={(props) => <EquityTooltip {...props} />}
              cursor={{ stroke: 'var(--color-border-strong)' }}
            />
            <Line
              type="monotone"
              dataKey="totalValue"
              stroke="var(--color-mint-strong)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: 'var(--color-card)' }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function EquityTooltip({ active, label, payload }: TooltipContentProps) {
  const value = payload[0]?.value;

  if (!active || typeof label !== 'string' || typeof value !== 'number') {
    return null;
  }

  return (
    <div className="rounded-soft border border-border bg-card px-3 py-2 shadow-card">
      <p className="text-caption font-semibold text-muted">{formatDate(label)}</p>
      <p className="mt-1 text-sm font-bold text-foreground">{formatCurrency(value)}</p>
    </div>
  );
}

function filterDataByRange(data: EquityCurvePoint[], range: RangeKey) {
  const selectedRange = ranges.find((item) => item.key === range);

  if (!selectedRange?.days) {
    return data;
  }

  const latestPoint = data.at(-1);

  if (!latestPoint) {
    return data;
  }

  const latestTime = toTime(latestPoint.date);
  const minTime = latestTime - selectedRange.days * 24 * 60 * 60 * 1000;

  return data.filter((point) => toTime(point.date) >= minTime);
}

function toTime(isoDate: string) {
  return new Date(`${isoDate}T00:00:00+09:00`).getTime();
}
