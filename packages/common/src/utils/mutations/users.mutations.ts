import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { components } from '@revassurance/api/openapi';
import {
  deletePlatformAdminStatus,
  createPlatformAdminStatus,
  revokeAllOtherSessions,
  revokeSession,
  revokeUserSessions,
  type DeletePlatformAdminStatusParams,
  type RevokeSessionParams,
  type RevokeUserSessionsParams,
} from '../../api/users.api';

type PostPlatformAdminStatusRequestBody =
  components['schemas']['PostPlatformAdminStatusRequestBody'];

/**
 * Mutation hook for deleting a platform admin status
 */
export const useDeletePlatformAdminMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: DeletePlatformAdminStatusParams) =>
      deletePlatformAdminStatus({ userId }),
    onSuccess: () => {
      // Invalidate and refetch platform admins list
      queryClient.invalidateQueries({ queryKey: ['platformAdmins'] });
    },
  });
};

/**
 * Mutation hook for creating a platform admin status
 */
export const useCreatePlatformAdminMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: PostPlatformAdminStatusRequestBody) =>
      createPlatformAdminStatus(body),
    onSuccess: () => {
      // Invalidate and refetch platform admins list
      queryClient.invalidateQueries({ queryKey: ['platformAdmins'] });
    },
  });
};

/**
 * Mutation hook for revoking all other sessions (keep current session active)
 */
export const useRevokeAllOtherSessionsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => revokeAllOtherSessions(),
    onSuccess: () => {
      // Invalidate and refetch user sessions list
      queryClient.invalidateQueries({ queryKey: ['userSessions'] });
    },
  });
};

/**
 * Mutation hook for revoking a specific session
 */
export const useRevokeSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId }: RevokeSessionParams) =>
      revokeSession({ sessionId }),
    onSuccess: () => {
      // Invalidate and refetch user sessions list
      queryClient.invalidateQueries({ queryKey: ['userSessions'] });
    },
  });
};

/**
 * Mutation hook for revoking all sessions for a user (Platform Admin only)
 */
export const useRevokeUserSessionsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: RevokeUserSessionsParams) =>
      revokeUserSessions({ userId }),
    onSuccess: (_, variables) => {
      // Invalidate and refetch user sessions and user queries
      queryClient.invalidateQueries({ queryKey: ['userSessions'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
};
