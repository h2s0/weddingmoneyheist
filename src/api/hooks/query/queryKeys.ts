export const portfolioQueryKeys = {
  all: ['portfolio'] as const,
  summary: () => [...portfolioQueryKeys.all, 'summary'] as const,
  holdings: () => [...portfolioQueryKeys.all, 'holdings'] as const,
  transactions: () => [...portfolioQueryKeys.all, 'transactions'] as const,
  equityCurve: () => [...portfolioQueryKeys.all, 'equity-curve'] as const,
};
