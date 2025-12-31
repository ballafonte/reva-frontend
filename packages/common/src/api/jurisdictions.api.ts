import type { components, paths } from '@revassurance/api/openapi';
import { callApi, getApiBaseUrl } from './api.utils';
import { ApiRequqestInit } from './api.types';

type Jurisdiction = components['schemas']['Jurisdiction'];

export type GetJurisdictionsQuery =
  paths['/jurisdictions']['get']['parameters']['query'];
export type GetJurisdictionsResponse =
  paths['/jurisdictions']['get']['responses']['200']['content']['application/json'];

export type GetJurisdictionsParams = GetJurisdictionsQuery;

/**
 * Retrieve all jurisdictions in the database
 * @param searchText Optional text to search jurisdictions by
 * @returns Promise resolving to an array of jurisdictions
 */
export const getJurisdictions = async ({
  searchText,
}: GetJurisdictionsQuery = {}): Promise<GetJurisdictionsResponse> => {
  const query: ApiRequqestInit['query'] = {};
  if (searchText) query.searchText = searchText;

  return callApi<void, GetJurisdictionsResponse>(
    `${getApiBaseUrl()}jurisdictions`,
    {
      method: 'GET',
      query,
    },
    undefined,
    () => {
      return new Error('We could not get the jurisdictions at this time');
    }
  );
};

export type GetJurisdictionByIdParams =
  paths['/jurisdictions/{id}']['get']['parameters']['path'];

/**
 * Retrieve a jurisdiction by ID
 * @param id The jurisdiction ID
 * @returns Promise resolving to a jurisdiction
 * @throws Error if jurisdiction is not found
 */
export const getJurisdictionById = async ({
  id,
}: GetJurisdictionByIdParams): Promise<Jurisdiction> => {
  return callApi<void, Jurisdiction>(
    `${getApiBaseUrl()}jurisdictions/${id}`,
    {
      method: 'GET',
    },
    undefined,
    () => {
      return new Error(`Jurisdiction with id ${id} not found`);
    }
  );
};

type PostJurisdictionRequestBody =
  components['schemas']['PostJurisdictionRequestBody'];

/**
 * Create a new jurisdiction
 * @param body The jurisdiction data to create
 * @returns Promise resolving to the created jurisdiction
 */
export const createJurisdiction = async (
  body: PostJurisdictionRequestBody
): Promise<Jurisdiction> => {
  return callApi<PostJurisdictionRequestBody, Jurisdiction>(
    `${getApiBaseUrl()}jurisdictions`,
    {
      method: 'POST',
      body,
    },
    undefined,
    () => {
      return new Error('Failed to create jurisdiction');
    }
  );
};

type PatchJurisdictionRequestBody =
  components['schemas']['PatchJurisdictionRequestBody'];

/**
 * Update a jurisdiction by ID
 * @param id The jurisdiction ID
 * @param body The jurisdiction data to update
 * @returns Promise resolving to the updated jurisdiction
 */
export const updateJurisdiction = async (
  id: string,
  body: PatchJurisdictionRequestBody
): Promise<Jurisdiction> => {
  return callApi<PatchJurisdictionRequestBody, Jurisdiction>(
    `${getApiBaseUrl()}jurisdictions/${id}`,
    {
      method: 'PATCH',
      body,
    },
    undefined,
    () => {
      return new Error(`Failed to update jurisdiction with id ${id}`);
    }
  );
};

/**
 * Delete a jurisdiction by ID
 * @param id The jurisdiction ID
 * @returns Promise resolving when the jurisdiction is deleted
 */
export const deleteJurisdiction = async (id: string): Promise<void> => {
  return callApi<void, void>(
    `${getApiBaseUrl()}jurisdictions/${id}`,
    {
      method: 'DELETE',
    },
    undefined,
    () => {
      return new Error(`Failed to delete jurisdiction with id ${id}`);
    }
  );
};
