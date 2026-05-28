import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '@/api/portfolioApi';
import { portfolioQueryKeys } from '@/api/hooks/query/queryKeys';

export const useTransactionsQuery = () =>
  useQuery({
    queryKey: portfolioQueryKeys.transactions(),
    queryFn: portfolioApi.getTransactions,
  });
