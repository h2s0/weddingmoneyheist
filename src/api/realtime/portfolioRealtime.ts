import type { EquityCurvePoint, Holding, PortfolioSummary, Transaction } from '@/types';

export type PortfolioRealtimeEvent =
  | {
      type: 'summary.updated';
      payload: PortfolioSummary;
    }
  | {
      type: 'holdings.updated';
      payload: Holding[];
    }
  | {
      type: 'transactions.updated';
      payload: Transaction[];
    }
  | {
      type: 'equityCurve.updated';
      payload: EquityCurvePoint[];
    };

export type PortfolioRealtimeUnsubscribe = () => void;

export type PortfolioRealtimeClient = {
  subscribe: (onEvent: (event: PortfolioRealtimeEvent) => void) => PortfolioRealtimeUnsubscribe;
};

export const createNoopPortfolioRealtimeClient = (): PortfolioRealtimeClient => ({
  subscribe: () => () => undefined,
});
