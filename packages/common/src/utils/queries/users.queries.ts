import { useQuery } from '@tanstack/react-query';
import type { User } from '../../types';
import { getPlatformAdmins } from '../../api/users.api';
import { QueryConfig } from './queries.types';

/**
 * Query hook for fetching all platform admins
 * @param searchText Optional text to search platform admins by email or status (client-side filtering)
 */
export const usePlatformAdminsQuery = (
  { searchText }: { searchText?: string } = {},
  queryConfig?: QueryConfig<User[]>
) => {
  return useQuery<User[]>({
    ...queryConfig,
    queryKey: ['platformAdmins', searchText],
    queryFn: async () => {
      const admins = await getPlatformAdmins();

      // Client-side filtering since API doesn't support searchText parameter
      if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        return admins.filter(
          (admin) =>
            admin.email?.toLowerCase().includes(lowerSearch) ||
            admin.status?.toLowerCase().includes(lowerSearch)
        );
      }

      return admins;
    },
  });
};
