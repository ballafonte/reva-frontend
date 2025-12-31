import { useQuery } from '@tanstack/react-query';
import type { Jurisdiction } from '../../types';
import {
  getJurisdictions,
  type GetJurisdictionsParams,
  getJurisdictionById,
  type GetJurisdictionByIdParams,
} from '../../api/jurisdictions.api';
import { QueryConfig } from './queries.types';

/**
 * Query hook for fetching all jurisdictions
 * @param searchText Optional text to search jurisdictions by
 */
export const useJurisdictionsQuery = (
  { searchText }: Partial<GetJurisdictionsParams> = {},
  queryConfig?: QueryConfig<Jurisdiction[]>
) => {
  return useQuery<Jurisdiction[]>({
    ...queryConfig,
    queryKey: ['jurisdictions', searchText],
    queryFn: () => getJurisdictions({ searchText }),
  });
};

/**
 * Query hook for fetching a single jurisdiction by ID
 * @param id The jurisdiction ID
 */
export const useJurisdictionQuery = (
  { id }: Partial<GetJurisdictionByIdParams> = {},
  queryConfig?: QueryConfig<Jurisdiction[]>
) => {
  return useQuery<Jurisdiction>({
    ...queryConfig,
    queryKey: ['jurisdiction', id],
    queryFn: () => {
      if (!id) throw new Error('Jurisdiction ID is required');
      return getJurisdictionById({ id });
    },
    enabled: !!id,
  });
};
