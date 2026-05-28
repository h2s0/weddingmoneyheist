export type DashboardWidgetKind = 'summary' | 'holdings' | 'transactions' | 'equity-curve';

export type DashboardWidgetId =
  | 'portfolio-summary'
  | 'holdings'
  | 'transactions'
  | 'equity-curve';

export type DashboardLayoutBreakpoint = 'desktop' | 'tablet' | 'mobile';

export type DashboardLayoutItem = {
  widgetId: DashboardWidgetId;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
};

export type DashboardLayout = Record<DashboardLayoutBreakpoint, DashboardLayoutItem[]>;

export type DashboardWidget = {
  id: DashboardWidgetId;
  kind: DashboardWidgetKind;
  title: string;
  description: string;
  defaultVisible: boolean;
};
