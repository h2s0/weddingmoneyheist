import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultDashboardLayout } from '@/mocks';
import type { DashboardLayout } from '@/types';

type DashboardLayoutState = {
  layout: DashboardLayout;
  setLayout: (layout: DashboardLayout) => void;
  resetLayout: () => void;
};

export const useDashboardLayoutStore = create<DashboardLayoutState>()(
  persist(
    (set) => ({
      layout: defaultDashboardLayout,
      setLayout: (layout) => {
        set({ layout });
      },
      resetLayout: () => {
        set({ layout: defaultDashboardLayout });
      },
    }),
    {
      name: 'abangi.dashboardLayout.v1',
    },
  ),
);
