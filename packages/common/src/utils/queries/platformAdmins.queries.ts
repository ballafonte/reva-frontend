import { useQuery } from '@tanstack/react-query';
import type { User } from '../../types';
import { QueryConfig } from './queries.types';
import { mockPlatformAdmins } from '../../../tests/mockData/platformAdmins';

/**
 * Query hook for fetching all platform admins
 * @param searchText Optional text to search platform admins by email or status
 */
export const usePlatformAdminsQuery = (
  { searchText }: { searchText?: string } = {},
  queryConfig?: QueryConfig<User[]>
) => {
  return useQuery<User[]>({
    ...queryConfig,
    queryKey: ['platformAdmins', searchText],
    queryFn: async () => {
      // TODO: Replace with API call when endpoint is ready
      // For now, return mock data with optional filtering
      const admins: User[] = [...mockPlatformAdmins];

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

/**
 * Query hook for fetching a single platform admin by ID
 * @param id The platform admin user ID
 */
export const usePlatformAdminQuery = (
  { id }: { id?: string } = {},
  queryConfig?: QueryConfig<User>
) => {
  return useQuery<User>({
    ...queryConfig,
    queryKey: ['platformAdmin', id],
    queryFn: async () => {
      // TODO: Replace with API call when endpoint is ready
      // For now, return mock data
      if (!id) throw new Error('Platform admin ID is required');

      const admin = mockPlatformAdmins.find((admin) => admin.id === id);
      if (!admin) {
        throw new Error(`Platform admin with id ${id} not found`);
      }

      return admin;
    },
    enabled: !!id,
  });
};
