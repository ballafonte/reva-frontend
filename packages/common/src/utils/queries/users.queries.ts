import { useQuery } from '@tanstack/react-query';
import {
  getPlatformAdmins,
  getUsers,
  getUserSessions,
  getUserById,
} from '../../api';
import type { User, Session } from '../../types';
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

/**
 * Query hook for fetching all users
 */
export const useUsersQuery = (queryConfig?: QueryConfig<User[]>) => {
  return useQuery<User[]>({
    ...queryConfig,
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

/**
 * Query hook for fetching all active sessions for the authenticated user
 */
export const useUserSessionsQuery = (queryConfig?: QueryConfig<Session[]>) => {
  return useQuery<Session[]>({
    ...queryConfig,
    queryKey: ['userSessions'],
    queryFn: getUserSessions,
  });
};

/**
 * Query hook for fetching a single user by ID
 * @param userId The user ID
 */
export const useUserQuery = (
  { id: userId }: { id?: string } = {},
  queryConfig?: QueryConfig<User>
) => {
  return useQuery<User>({
    ...queryConfig,
    queryKey: ['user', userId],
    queryFn: () => {
      if (!userId) throw new Error('User ID is required');
      return getUserById({ userId });
    },
    enabled: !!userId,
  });
};
