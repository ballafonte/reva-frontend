import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { components } from '@revassurance/api/openapi';
import {
  deleteOrganization,
  updateOrganization,
  createOrganization,
} from '../../api/organizations.api';

type PatchOrganizationRequestBody =
  components['schemas']['PatchOrganizationRequestBody'];
type PostOrganizationRequestBody =
  components['schemas']['PostOrganizationRequestBody'];

/**
 * Mutation hook for deleting an organization
 */
export const useDeleteOrganizationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess: () => {
      // Invalidate and refetch organizations list
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

/**
 * Mutation hook for updating an organization
 */
export const useUpdateOrganizationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: PatchOrganizationRequestBody;
    }) => updateOrganization(id, body),
    onSuccess: (_, variables) => {
      // Invalidate and refetch organizations list
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      // Also invalidate the specific organization query if it exists
      queryClient.invalidateQueries({
        queryKey: ['organization', variables.id],
      });
    },
  });
};

/**
 * Mutation hook for creating an organization
 */
export const useCreateOrganizationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: PostOrganizationRequestBody) => createOrganization(body),
    onSuccess: () => {
      // Invalidate and refetch organizations list
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

