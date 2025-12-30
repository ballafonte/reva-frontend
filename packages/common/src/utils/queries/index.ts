import { useQuery } from '@tanstack/react-query';
import type { Jurisdiction } from '../../types';
import { getJurisdictions, getJurisdictionById } from '../../api/jurisdictions.api';

/**
 * Query hook for fetching all jurisdictions
 * @param searchText Optional text to search jurisdictions by
 */
export const useJurisdictionsQuery = (searchText?: string) => {
  return useQuery<Jurisdiction[]>({
    queryKey: ['jurisdictions', searchText],
    queryFn: () => getJurisdictions({ searchText }),
  });
};

/**
 * Query hook for fetching a single jurisdiction by ID
 * @param id The jurisdiction ID
 */
export const useJurisdictionQuery = (id: string) => {
  return useQuery<Jurisdiction>({
    queryKey: ['jurisdiction', id],
    queryFn: () => getJurisdictionById(id),
    enabled: !!id,
  });
};

