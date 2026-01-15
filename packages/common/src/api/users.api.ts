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
  paths['/users/{userId}']['get']['parameters']['path'];

/**
 * Retrieve a user by ID
 * @param userId The user ID
 * @returns Promise resolving to a user
 * @throws Error if user is not found
 */
export const getUserById = async ({
  userId,
}: GetUserByIdParams): Promise<User> => {
  return callApi<void, User>(
    `${getApiBaseUrl()}users/${userId}`,
    {
      method: 'GET',
    },
    undefined,
    () => {
      return new Error(`User with id ${userId} not found`);
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

export type GetUsersResponse =
  paths['/users']['get']['responses']['200']['content']['application/json'];

/**
 * Retrieve all users in the system
 * @returns Promise resolving to an array of users
 */
export const getUsers = async (): Promise<GetUsersResponse> => {
  return callApi<void, GetUsersResponse>(
    `${getApiBaseUrl()}users`,
    {
      method: 'GET',
    },
    undefined,
    () => {
      return new Error('We could not get the users at this time');
    }
  );
};

export type GetUserSessionsResponse =
  paths['/users/sessions']['get']['responses']['200']['content']['application/json'];

/**
 * Retrieve all active sessions for the authenticated user
 * @returns Promise resolving to an array of sessions
 */
export const getUserSessions = async (): Promise<GetUserSessionsResponse> => {
  return callApi<void, GetUserSessionsResponse>(
    `${getApiBaseUrl()}users/sessions`,
    {
      method: 'GET',
    },
    undefined,
    () => {
      return new Error('We could not get the user sessions at this time');
    }
  );
};

/**
 * Revoke all other sessions (keep current session active)
 * @returns Promise resolving when all other sessions are revoked
 */
export const revokeAllOtherSessions = async (): Promise<void> => {
  return callApi<void, void>(
    `${getApiBaseUrl()}users/sessions`,
    {
      method: 'DELETE',
    },
    undefined,
    () => {
      return new Error('Failed to revoke all other sessions');
    }
  );
};

export type RevokeSessionParams =
  paths['/users/sessions/{sessionId}']['delete']['parameters']['path'];

/**
 * Revoke a specific session by ID
 * @param sessionId The session ID to revoke
 * @returns Promise resolving when the session is revoked
 */
export const revokeSession = async ({
  sessionId,
}: RevokeSessionParams): Promise<void> => {
  return callApi<void, void>(
    `${getApiBaseUrl()}users/sessions/${sessionId}`,
    {
      method: 'DELETE',
    },
    undefined,
    () => {
      return new Error(`Failed to revoke session ${sessionId}`);
    }
  );
};

export type RevokeUserSessionsParams =
  paths['/users/{userId}/sessions']['delete']['parameters']['path'];

/**
 * Revoke all sessions for a specific user (Platform Admin only)
 * @param userId The user ID whose sessions should be revoked
 * @returns Promise resolving when all sessions for the user are revoked
 */
export const revokeUserSessions = async ({
  userId,
}: RevokeUserSessionsParams): Promise<void> => {
  return callApi<void, void>(
    `${getApiBaseUrl()}users/${userId}/sessions`,
    {
      method: 'DELETE',
    },
    undefined,
    () => {
      return new Error(`Failed to revoke sessions for user ${userId}`);
    }
  );
};
