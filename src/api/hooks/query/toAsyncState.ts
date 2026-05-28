import type { UseQueryResult } from '@tanstack/react-query';
import type { MockAsyncState } from '@/types';

export const toAsyncState = <T>(
  query: UseQueryResult<T>,
  emptyValue: T,
  isEmpty?: (data: T) => boolean,
): MockAsyncState<T> => {
  if (query.isPending) {
    return { status: 'loading' };
  }

  if (query.isError) {
    return {
      status: 'error',
      message: query.error.message,
    };
  }

  if (isEmpty?.(query.data)) {
    return {
      status: 'empty',
      data: emptyValue,
    };
  }

  return {
    status: 'success',
    data: query.data,
  };
};
