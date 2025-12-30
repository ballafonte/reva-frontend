import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { components } from '@revassurance/api/openapi';
import { deleteJurisdiction, updateJurisdiction, createJurisdiction } from '../../api/jurisdictions.api';

type PatchJurisdictionRequestBody = components['schemas']['PatchJurisdictionRequestBody'];
type PostJurisdictionRequestBody = components['schemas']['PostJurisdictionRequestBody'];

/**
 * Mutation hook for deleting a jurisdiction
 */
export const useDeleteJurisdictionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJurisdiction(id),
    onSuccess: () => {
      // Invalidate and refetch jurisdictions list
      queryClient.invalidateQueries({ queryKey: ['jurisdictions'] });
    },
  });
};

/**
 * Mutation hook for updating a jurisdiction
 */
export const useUpdateJurisdictionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: PatchJurisdictionRequestBody }) =>
      updateJurisdiction(id, body),
    onSuccess: (_, variables) => {
      // Invalidate and refetch jurisdictions list
      queryClient.invalidateQueries({ queryKey: ['jurisdictions'] });
      // Also invalidate the specific jurisdiction query if it exists
      queryClient.invalidateQueries({ queryKey: ['jurisdiction', variables.id] });
    },
  });
};

/**
 * Mutation hook for creating a jurisdiction
 */
export const useCreateJurisdictionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: PostJurisdictionRequestBody) => createJurisdiction(body),
    onSuccess: () => {
      // Invalidate and refetch jurisdictions list
      queryClient.invalidateQueries({ queryKey: ['jurisdictions'] });
    },
  });
};
