import type { EquityCurvePoint, Holding, PortfolioSummary, Transaction } from '@/types';

export type PortfolioApiClient = {
  getPortfolioSummary: () => Promise<PortfolioSummary>;
  getHoldings: () => Promise<Holding[]>;
  getTransactions: () => Promise<Transaction[]>;
  getEquityCurve: () => Promise<EquityCurvePoint[]>;
};
