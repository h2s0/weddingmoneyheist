import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '@/api/portfolioApi';
import { portfolioQueryKeys } from '@/api/hooks/query/queryKeys';

export const useEquityCurveQuery = () =>
  useQuery({
    queryKey: portfolioQueryKeys.equityCurve(),
    queryFn: portfolioApi.getEquityCurve,
  });
