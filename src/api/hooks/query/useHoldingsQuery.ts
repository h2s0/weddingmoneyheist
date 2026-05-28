import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '@/api/portfolioApi';
import { portfolioQueryKeys } from '@/api/hooks/query/queryKeys';

export const useHoldingsQuery = () =>
  useQuery({
    queryKey: portfolioQueryKeys.holdings(),
    queryFn: portfolioApi.getHoldings,
  });
