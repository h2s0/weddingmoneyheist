import {
  mockEquityCurve,
  mockHoldings,
  mockPortfolioSummary,
  mockTransactions,
} from '@/mocks';
import type { PortfolioApiClient } from '@/api/client';

export const mockPortfolioClient: PortfolioApiClient = {
  getPortfolioSummary: () => Promise.resolve(mockPortfolioSummary),
  getHoldings: () => Promise.resolve(mockHoldings),
  getTransactions: () => Promise.resolve(mockTransactions),
  getEquityCurve: () => Promise.resolve(mockEquityCurve),
};
