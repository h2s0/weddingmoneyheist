import type { Layout, Layouts } from 'react-grid-layout';
import type {
  DashboardLayout,
  DashboardLayoutBreakpoint,
  DashboardLayoutItem,
  DashboardWidgetId,
} from '@/types';

const breakpointKeys = ['desktop', 'tablet', 'mobile'] as const satisfies DashboardLayoutBreakpoint[];

const toGridItem = (item: DashboardLayoutItem): Layout => ({
  i: item.widgetId,
  x: item.x,
  y: item.y,
  w: item.width,
  h: item.height,
  minW: item.minWidth,
  minH: item.minHeight,
});

const fromGridItem = (item: Layout): DashboardLayoutItem => ({
  widgetId: item.i as DashboardWidgetId,
  x: item.x,
  y: item.y,
  width: item.w,
  height: item.h,
  minWidth: item.minW ?? 1,
  minHeight: item.minH ?? 1,
});

export const toGridLayouts = (layout: DashboardLayout): Layouts =>
  breakpointKeys.reduce<Layouts>((layouts, breakpoint) => {
    layouts[breakpoint] = layout[breakpoint].map(toGridItem);
    return layouts;
  }, {});

export const fromGridLayouts = (layouts: Layouts, fallback: DashboardLayout): DashboardLayout =>
  breakpointKeys.reduce<DashboardLayout>((nextLayout, breakpoint) => {
    const breakpointLayout = layouts[breakpoint];
    nextLayout[breakpoint] = breakpointLayout?.map(fromGridItem) ?? fallback[breakpoint];
    return nextLayout;
  }, {} as DashboardLayout);
