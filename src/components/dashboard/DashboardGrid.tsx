import { useMemo } from 'react';
import { Responsive, WidthProvider, type Layouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { Button } from '@/components/common/Button';
import { DragHandle } from '@/components/dashboard/DragHandle';
import { fromGridLayouts, toGridLayouts } from '@/components/dashboard/layoutMapping';
import { PortfolioSummaryWidget } from '@/components/widgets/PortfolioSummaryWidget';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { dashboardWidgets, portfolioSummaryStates } from '@/mocks';
import { useDashboardLayoutStore } from '@/stores/dashboardLayoutStore';
import type { DashboardWidget } from '@/types';

const ResponsiveGridLayout = WidthProvider(Responsive);

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

const widgetIcon = {
  'portfolio-summary': '💰',
  holdings: '🛒',
  transactions: '📒',
  'equity-curve': '📈',
} as const;

const renderWidget = (widget: DashboardWidget) => {
  const action = <DragHandle />;

  if (widget.kind === 'summary') {
    return <PortfolioSummaryWidget state={portfolioSummaryStates.success} action={action} />;
  }

  return (
    <WidgetCard
      title={widget.title}
      eyebrow="Phase 4"
      icon={widgetIcon[widget.id]}
      action={action}
      className="h-full"
    >
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-4">
        <p className="text-body text-muted">{widget.description}</p>
        <div className="rounded-soft border border-dashed border-border bg-background-soft px-4 py-3 text-caption font-semibold text-muted">
          위젯 콘텐츠는 다음 Phase에서 연결합니다.
        </div>
      </div>
    </WidgetCard>
  );
};

export function DashboardGrid() {
  const layout = useDashboardLayoutStore((state) => state.layout);
  const setLayout = useDashboardLayoutStore((state) => state.setLayout);
  const resetLayout = useDashboardLayoutStore((state) => state.resetLayout);
  const gridLayouts = useMemo(() => toGridLayouts(layout), [layout]);

  const handleLayoutChange = (_currentLayout: Layouts[string], allLayouts: Layouts) => {
    setLayout(fromGridLayouts(allLayouts, layout));
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">대시보드</h2>
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
            {renderWidget(widget)}
          </div>
        ))}
      </ResponsiveGridLayout>
    </section>
  );
}
