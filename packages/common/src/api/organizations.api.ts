import type { components, paths } from '@revassurance/api/openapi';
import { callApi, getApiBaseUrl } from './api.utils';
import { ApiRequqestInit } from './api.types';

type Organization = components['schemas']['Organization'];

export type GetOrganizationsQuery =
  paths['/organizations']['get']['parameters']['query'];
export type GetOrganizationsResponse =
  paths['/organizations']['get']['responses']['200']['content']['application/json'];

export type GetOrganizationsParams = GetOrganizationsQuery;

/**
 * Retrieve all organizations from the database
 * @param searchText Optional text to search organizations by
 * @returns Promise resolving to an array of organizations
 */
export const getOrganizations = async ({
  searchText,
}: GetOrganizationsQuery = {}): Promise<GetOrganizationsResponse> => {
  const query: ApiRequqestInit['query'] = {};
  if (searchText) query.searchText = searchText;

  return callApi<void, GetOrganizationsResponse>(
    `${getApiBaseUrl()}organizations`,
    {
      method: 'GET',
      query,
    },
    undefined,
    () => {
      return new Error('We could not get the organizations at this time');
    }
  );
};

export type GetOrganizationByIdParams =
  paths['/organizations/{id}']['get']['parameters']['path'];

/**
 * Retrieve an organization by ID
 * @param id The organization ID
 * @returns Promise resolving to an organization
 * @throws Error if organization is not found
 */
export const getOrganizationById = async ({
  id,
}: GetOrganizationByIdParams): Promise<Organization> => {
  return callApi<void, Organization>(
    `${getApiBaseUrl()}organizations/${id}`,
    {
      method: 'GET',
    },
    undefined,
    () => {
      return new Error(`Organization with id ${id} not found`);
    }
  );
};

type PostOrganizationRequestBody =
  components['schemas']['PostOrganizationRequestBody'];

/**
 * Create a new organization
 * @param body The organization data to create
 * @returns Promise resolving to the created organization
 */
export const createOrganization = async (
  body: PostOrganizationRequestBody
): Promise<Organization> => {
  return callApi<PostOrganizationRequestBody, Organization>(
    `${getApiBaseUrl()}organizations`,
    {
      method: 'POST',
      body,
    },
    undefined,
    () => {
      return new Error('Failed to create organization');
    }
  );
};

type PatchOrganizationRequestBody =
  components['schemas']['PatchOrganizationRequestBody'];

/**
 * Update an organization by ID
 * @param id The organization ID
 * @param body The organization data to update
 * @returns Promise resolving to the updated organization
 */
export const updateOrganization = async (
  id: string,
  body: PatchOrganizationRequestBody
): Promise<Organization> => {
  return callApi<PatchOrganizationRequestBody, Organization>(
    `${getApiBaseUrl()}organizations/${id}`,
    {
      method: 'PATCH',
      body,
    },
    undefined,
    () => {
      return new Error(`Failed to update organization with id ${id}`);
    }
  );
};

export type DeleteOrganizationParams =
  paths['/organizations/{id}']['delete']['parameters']['path'];

/**
 * Delete an organization by ID
 * @param id The organization ID
 * @returns Promise resolving when the organization is deleted
 */
export const deleteOrganization = async ({
  id,
}: DeleteOrganizationParams): Promise<void> => {
  return callApi<void, void>(
    `${getApiBaseUrl()}organizations/${id}`,
    {
      method: 'DELETE',
    },
    undefined,
    () => {
      return new Error(`Failed to delete organization with id ${id}`);
    }
  );
};
