import type { components, paths } from '@revassurance/api/openapi';
import { callApi, getApiBaseUrl } from './api.utils';

type User = components['schemas']['User'];
type PlatformAdminStatus = components['schemas']['PlatformAdminStatus'];
type PostPlatformAdminStatusRequestBody =
  components['schemas']['PostPlatformAdminStatusRequestBody'];

export type GetPlatformAdminsResponse =
  paths['/users/platform-admins']['get']['responses']['200']['content']['application/json'];

/**
 * Retrieve all platform admin users
 * @returns Promise resolving to an array of platform admin users
 */
export const getPlatformAdmins =
  async (): Promise<GetPlatformAdminsResponse> => {
    return callApi<void, GetPlatformAdminsResponse>(
      `${getApiBaseUrl()}users/platform-admins`,
      {
        method: 'GET',
      },
      undefined,
      () => {
        return new Error('We could not get the platform admins at this time');
      }
    );
  };

export type GetUserByIdParams =
  paths['/users/{id}']['get']['parameters']['path'];

/**
 * Retrieve a user by ID
 * @param id The user ID
 * @returns Promise resolving to a user
 * @throws Error if user is not found
 */
export const getUserById = async ({ id }: GetUserByIdParams): Promise<User> => {
  return callApi<void, User>(
    `${getApiBaseUrl()}users/${id}`,
    {
      method: 'GET',
    },
    undefined,
    () => {
      return new Error(`User with id ${id} not found`);
    }
  );
};

/**
 * Create a platform admin status for a user
 * @param body The platform admin status data to create
 * @returns Promise resolving to the created platform admin status
 */
export const createPlatformAdminStatus = async (
  body: PostPlatformAdminStatusRequestBody
): Promise<PlatformAdminStatus> => {
  return callApi<PostPlatformAdminStatusRequestBody, PlatformAdminStatus>(
    `${getApiBaseUrl()}users/platform-admin-statuses`,
    {
      method: 'POST',
      body,
    },
    undefined,
    () => {
      return new Error('Failed to create platform admin status');
    }
  );
};

export type DeletePlatformAdminStatusParams =
  paths['/users/platform-admin-statuses/{userId}']['delete']['parameters']['path'];

/**
 * Delete a platform admin status by user ID
 * @param userId The user ID whose platform admin status should be removed
 * @returns Promise resolving when the platform admin status is deleted
 */
export const deletePlatformAdminStatus = async ({
  userId,
}: DeletePlatformAdminStatusParams): Promise<void> => {
  return callApi<void, void>(
    `${getApiBaseUrl()}users/platform-admin-statuses/${userId}`,
    {
      method: 'DELETE',
    },
    undefined,
    () => {
      return new Error(
        `Failed to delete platform admin status for user ${userId}`
      );
    }
  );
};
