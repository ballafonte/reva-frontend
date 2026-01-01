import { useQuery } from '@tanstack/react-query';
import { getPlatformAdmins } from '@common/api';
import type { User } from '@common/types';
import { QueryConfig } from './queries.types';

/**
 * Query hook for fetching all platform admins
 * @param searchText Optional text to search platform admins by email or status (client-side filtering)
 */
export const usePlatformAdminsQuery = (queryConfig?: QueryConfig<User[]>) => {
  return useQuery<User[]>({
    ...queryConfig,
    queryKey: ['platformAdmins'],
    queryFn: getPlatformAdmins,
  });
};
