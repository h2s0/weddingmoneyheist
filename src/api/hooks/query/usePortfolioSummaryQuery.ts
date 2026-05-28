import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '@/api/portfolioApi';
import { portfolioQueryKeys } from '@/api/hooks/query/queryKeys';

export const usePortfolioSummaryQuery = () =>
  useQuery({
    queryKey: portfolioQueryKeys.summary(),
    queryFn: portfolioApi.getPortfolioSummary,
  });
