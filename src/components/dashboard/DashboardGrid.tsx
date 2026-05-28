import { lazy, Suspense, useMemo, type ReactNode } from 'react';
import { Responsive, WidthProvider, type Layouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { Button } from '@/components/common/Button';
import { DragHandle } from '@/components/dashboard/DragHandle';
import { fromGridLayouts, toGridLayouts } from '@/components/dashboard/layoutMapping';
import { HoldingsWidget } from '@/components/widgets/HoldingsWidget';
import { PortfolioSummaryWidget } from '@/components/widgets/PortfolioSummaryWidget';
import { TransactionsWidget } from '@/components/widgets/TransactionsWidget';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { WidgetLoading } from '@/components/widgets/WidgetState';
import {
  toAsyncState,
  useEquityCurveQuery,
  useHoldingsQuery,
  usePortfolioSummaryQuery,
  useTransactionsQuery,
} from '@/api/hooks/query';
import {
  dashboardWidgets,
  emptyPortfolioSummary,
  mockEquityCurve,
} from '@/mocks';
import { useDashboardLayoutStore } from '@/stores/dashboardLayoutStore';
import type { DashboardWidget, EquityCurvePoint, Holding, MockAsyncState, PortfolioSummary, Transaction } from '@/types';

const ResponsiveGridLayout = WidthProvider(Responsive);
const EquityCurveWidget = lazy(async () => {
  const module = await import('@/components/widgets/EquityCurveWidget');

  return { default: module.EquityCurveWidget };
});

const breakpoints = {
  desktop: 1180,
  tablet: 760,
  mobile: 0,
};

const columns = {
  desktop: 12,
  tablet: 6,
  mobile: 1,
};

const margin: Record<keyof typeof breakpoints, [number, number]> = {
  desktop: [18, 18],
  tablet: [16, 16],
  mobile: [14, 14],
};

type DashboardWidgetStates = {
  summary: MockAsyncState<PortfolioSummary>;
  holdings: MockAsyncState<Holding[]>;
  transactions: MockAsyncState<Transaction[]>;
  equityCurve: MockAsyncState<EquityCurvePoint[]>;
};

const renderWidget = (widget: DashboardWidget, states: DashboardWidgetStates) => {
  const action = <DragHandle />;

  switch (widget.kind) {
    case 'summary':
      return <PortfolioSummaryWidget state={states.summary} action={action} />;
    case 'holdings':
      return <HoldingsWidget state={states.holdings} action={action} />;
    case 'transactions':
      return <TransactionsWidget state={states.transactions} action={action} />;
    case 'equity-curve':
      return (
        <Suspense fallback={<ChartWidgetFallback action={action} />}>
          <EquityCurveWidget state={states.equityCurve} action={action} />
        </Suspense>
      );
  }
};

function ChartWidgetFallback({ action }: { action: ReactNode }) {
  return (
    <WidgetCard title="수익률 추이" eyebrow="차트" icon="📈" action={action} className="h-full">
      <WidgetLoading title="차트 로딩" description="차트 모듈을 준비하는 중입니다." />
    </WidgetCard>
  );
}

export function DashboardGrid() {
  const layout = useDashboardLayoutStore((state) => state.layout);
  const setLayout = useDashboardLayoutStore((state) => state.setLayout);
  const resetLayout = useDashboardLayoutStore((state) => state.resetLayout);
  const summaryQuery = usePortfolioSummaryQuery();
  const holdingsQuery = useHoldingsQuery();
  const transactionsQuery = useTransactionsQuery();
  const equityCurveQuery = useEquityCurveQuery();
  const gridLayouts = useMemo(() => toGridLayouts(layout), [layout]);
  const widgetStates: DashboardWidgetStates = {
    summary: toAsyncState(
      summaryQuery,
      emptyPortfolioSummary,
      (summary) => summary.currentValue === 0,
    ),
    holdings: toAsyncState(holdingsQuery, [], (holdings) => holdings.length === 0),
    transactions: toAsyncState(transactionsQuery, [], (transactions) => transactions.length === 0),
    equityCurve: toAsyncState(equityCurveQuery, mockEquityCurve, (points) => points.length === 0),
  };

  const handleLayoutChange = (_currentLayout: Layouts[string], allLayouts: Layouts) => {
    setLayout(fromGridLayouts(allLayouts, layout));
  };

  return (
    <section className="flex flex-col gap-4" aria-labelledby="dashboard-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="dashboard-title" className="font-display text-2xl font-semibold text-foreground">
            대시보드
          </h2>
          <p className="mt-1 text-sm text-muted">핸들을 잡아 이동하고 모서리에서 크기를 조절합니다.</p>
        </div>
        <Button onClick={resetLayout}>레이아웃 초기화</Button>
      </div>

      <ResponsiveGridLayout
        className="dashboard-grid"
        layouts={gridLayouts}
        breakpoints={breakpoints}
        cols={columns}
        margin={margin}
        rowHeight={88}
        draggableHandle=".dashboard-drag-handle"
        draggableCancel="button:not(.dashboard-drag-handle)"
        resizeHandles={['se']}
        compactType="vertical"
        preventCollision={false}
        onLayoutChange={handleLayoutChange}
      >
        {dashboardWidgets.map((widget) => (
          <div key={widget.id} className="min-h-0">
            {renderWidget(widget, widgetStates)}
          </div>
        ))}
      </ResponsiveGridLayout>
    </section>
  );
}
