import { useQuery } from '@tanstack/react-query';
import type { Organization } from '../../types';
import {
  getOrganizations,
  type GetOrganizationsParams,
  getOrganizationById,
  type GetOrganizationByIdParams,
} from '../../api/organizations.api';
import { QueryConfig } from './queries.types';

/**
 * Query hook for fetching all organizations
 * @param searchText Optional text to search organizations by
 */
export const useOrganizationsQuery = (
  { searchText }: Partial<GetOrganizationsParams> = {},
  queryConfig?: QueryConfig<Organization[]>
) => {
  return useQuery<Organization[]>({
    ...queryConfig,
    queryKey: ['organizations', searchText],
    queryFn: () => getOrganizations({ searchText }),
  });
};

/**
 * Query hook for fetching a single organization by ID
 * @param id The organization ID
 */
export const useOrganizationQuery = (
  { id }: Partial<GetOrganizationByIdParams> = {},
  queryConfig?: QueryConfig<Organization>
) => {
  return useQuery<Organization>({
    ...queryConfig,
    queryKey: ['organization', id],
    queryFn: () => {
      if (!id) throw new Error('Organization ID is required');
      return getOrganizationById({ id });
    },
    enabled: !!id,
  });
};

