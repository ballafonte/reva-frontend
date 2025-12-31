import { callApi, getApiBaseUrl } from './api.utils';
import { authStore } from '../utils/auth/authStore';

/**
 * Response body from POST /sign-in
 */
export type PostSignInResponseBody = {
  user: any; // User DTO coming soon
  token: string; // JWT token string
};

/**
 * Response body from POST /auth/refresh
 */
export type PostRefreshResponseBody = {
  token: string; // New JWT token string
};

/**
 * Sign in with email and password
 *
 * @param email User email
 * @param password User password
 * @returns Promise resolving to the sign-in response with user and token
 */
export async function signIn(
  email: string,
  password: string
): Promise<PostSignInResponseBody> {
  const response = await callApi<
    { email: string; password: string },
    PostSignInResponseBody
  >(
    `${getApiBaseUrl()}sign-in`,
    {
      method: 'POST',
      body: { email, password },
      headers: false, // Let callApi set default headers
    },
    undefined,
    () => {
      return new Error('Sign-in failed');
    },
    false // Don't include auth header for sign-in
  );

  // Store the access token in memory
  authStore.setToken(response.token);

  return response;
}

/**
 * Refresh the access token using the refresh token cookie
 *
 * The refresh token is automatically sent by the browser as an HttpOnly cookie.
 * This function should be called when a 401 response is received.
 *
 * @returns Promise resolving to the new access token
 */
export async function refreshToken(): Promise<string> {
  const response = await callApi<void, PostRefreshResponseBody>(
    `${getApiBaseUrl()}auth/refresh`,
    {
      method: 'POST',
      headers: false,
    },
    undefined,
    () => {
      return new Error('Token refresh failed');
    },
    false // Don't include auth header for refresh (uses cookie instead)
  );

  // Store the new access token in memory
  authStore.setToken(response.token);

  return response.token;
}

/**
 * Log out the current user
 *
 * This clears the refresh token cookie on the backend and clears
 * the access token from memory.
 */
export async function signOut(): Promise<void> {
  try {
    await callApi<void, void>(
      `${getApiBaseUrl()}auth/sign-out`,
      {
        method: 'POST',
        headers: false,
      },
      undefined,
      () => {
        return new Error('Sign out failed');
      },
      false // Don't include auth header for sign out
    );
  } catch (error) {
    // Even if sign out fails on backend, clear local token
    console.error('Sign out error:', error);
  } finally {
    // Always clear the access token from memory
    authStore.clear();
  }
}
