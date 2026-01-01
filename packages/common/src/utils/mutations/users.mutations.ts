import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { components } from '@revassurance/api/openapi';
import {
  deletePlatformAdminStatus,
  createPlatformAdminStatus,
  type DeletePlatformAdminStatusParams,
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
