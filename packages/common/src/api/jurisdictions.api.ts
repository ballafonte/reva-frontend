import type { components } from '@revassurance/api/openapi';
import { getApiBaseUrl } from './api.utils';

type Jurisdiction = components['schemas']['Jurisdiction'];
type PostJurisdictionRequestBody = components['schemas']['PostJurisdictionRequestBody'];
type PatchJurisdictionRequestBody = components['schemas']['PatchJurisdictionRequestBody'];

/**
 * Retrieve all jurisdictions in the database
 * @param searchText Optional text to search jurisdictions by
 * @returns Promise resolving to an array of jurisdictions
 */
export const getJurisdictions = async (searchText?: string): Promise<Jurisdiction[]> => {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl || baseUrl.trim() === '') {
    throw new Error('API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL or call setApiBaseUrl()');
  }
  const url = new URL('/jurisdictions', baseUrl);
  if (searchText) {
    url.searchParams.set('searchText', searchText);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch jurisdictions: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Retrieve a jurisdiction by ID
 * @param id The jurisdiction ID
 * @returns Promise resolving to a jurisdiction
 * @throws Error if jurisdiction is not found
 */
export const getJurisdictionById = async (id: string): Promise<Jurisdiction> => {
  const url = new URL(`/jurisdictions/${id}`, getApiBaseUrl());

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Jurisdiction with id ${id} not found`);
    }
    throw new Error(`Failed to fetch jurisdiction: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Create a new jurisdiction
 * @param body The jurisdiction data to create
 * @returns Promise resolving to the created jurisdiction
 */
export const createJurisdiction = async (
  body: PostJurisdictionRequestBody
): Promise<Jurisdiction> => {
  const url = new URL('/jurisdictions', getApiBaseUrl());

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to create jurisdiction: ${response.statusText}`);
  }

  return response.json();
};

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
  const url = new URL(`/jurisdictions/${id}`, getApiBaseUrl());

  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to update jurisdiction: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Delete a jurisdiction by ID
 * @param id The jurisdiction ID
 * @returns Promise resolving when the jurisdiction is deleted
 */
export const deleteJurisdiction = async (id: string): Promise<void> => {
  const url = new URL(`/jurisdictions/${id}`, getApiBaseUrl());

  const response = await fetch(url.toString(), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete jurisdiction: ${response.statusText}`);
  }
};

