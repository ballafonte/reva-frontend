import type { paths } from '@revassurance/api/openapi';
import { authStore, printConsole } from '@common/utils';
import { createApiErrorFromResponse } from './api.errors';
import { callApi, getApiBaseUrl } from './api.utils';

type PostSignUpRequestBody =
  paths['/users/sign-up']['post']['requestBody']['content']['application/json'];

export type PostSignUpResponseBody = void;

/**
 * Sign up with email and password
 *
 * @param email User email
 * @param password User password
 * @returns Promise resolving to the sign-up response
 */
export async function signUp({
  email,
  passwordRaw,
}: PostSignUpRequestBody): Promise<PostSignUpResponseBody> {
  return callApi<PostSignUpRequestBody, PostSignUpResponseBody>(
    `${getApiBaseUrl()}users/sign-up`,
    {
      method: 'POST',
      body: { email, passwordRaw },
      headers: false, // Let callApi set default headers
    },
    undefined,
    async (error) => {
      // If it's a Response object, extract error information
      if (error instanceof Response) {
        return createApiErrorFromResponse(error, 'Sign-up failed');
      }
      // Otherwise, wrap in a generic error
      return error instanceof Error ? error : new Error('Sign-up failed');
    },
    false // Don't include auth header for sign-up
  );
}

type PostSignInRequestBody =
  paths['/users/sign-in']['post']['requestBody']['content']['application/json'];

export type PostSignInResponseBody =
  paths['/users/sign-in']['post']['responses']['200']['content']['application/json'];

/**
 * Sign in with email and password
 *
 * @param email User email
 * @param password User password
 * @returns Promise resolving to the sign-in response with user and accessToken
 */
export async function signIn({
  email,
  passwordRaw,
}: PostSignInRequestBody): Promise<PostSignInResponseBody> {
  const response = await callApi<PostSignInRequestBody, PostSignInResponseBody>(
    `${getApiBaseUrl()}users/sign-in`,
    {
      method: 'POST',
      body: { email, passwordRaw },
      headers: false, // Let callApi set default headers
    },
    undefined,
    async (error) => {
      // If it's a Response object, extract error information
      if (error instanceof Response) {
        return createApiErrorFromResponse(error, 'Sign-in failed');
      }
      // Otherwise, wrap in a generic error
      return error instanceof Error ? error : new Error('Sign-in failed');
    },
    false // Don't include auth header for sign-in
  );

  // Store the access token in memory
  // Ensure response has accessToken before storing
  if (
    response &&
    typeof response === 'object' &&
    'accessToken' in response &&
    response.accessToken
  ) {
    authStore.setToken(response.accessToken);
  } else {
    printConsole('error', 'Sign-in response missing accessToken:', response);
    throw new Error('Sign-in response is missing the access token');
  }

  return response;
}

export type PostRefreshResponseBody =
  paths['/users/refresh-token']['post']['responses']['200']['content']['application/json'];

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
    `${getApiBaseUrl()}users/refresh-token`,
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
  authStore.setToken(response.accessToken);

  return response.accessToken;
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
      `${getApiBaseUrl()}users/sign-out`,
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
    printConsole('error', 'Sign out error:', error);
  } finally {
    // Always clear the access token from memory
    authStore.clear();
  }
}
