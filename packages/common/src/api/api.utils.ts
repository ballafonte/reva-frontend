import { printConsole } from '../utils/console';
import {
  API_STATUS_CODES,
  API_DEFAULT_HEADERS,
  API_MANDATORY_HEADERS,
} from './api.constants';
import {
  ApiEndpoint,
  ApiRequqestInit,
  ApiSuccessCbType,
  ApiFailureCbType,
} from './api.types';

/**
 * API utility functions for configuring API endpoints
 */

/**
 * Set the API base URL (for testing or runtime configuration)
 * Note: This is a simple setter that can be used for testing
 */
let customApiBaseUrl: string = '';

export const setApiBaseUrl = (url: string): void => {
  customApiBaseUrl = url;
};

export const resetApiBaseUrl = (): void => {
  customApiBaseUrl = '';
};

/**
 * Get the API base URL, checking for custom URL first, then environment variables
 * This function is called each time to ensure it gets the latest value
 */
export const getApiBaseUrl = (): string => {
  // If a custom URL has been set, use it (must be non-empty)
  if (customApiBaseUrl && customApiBaseUrl.trim()) {
    const url = customApiBaseUrl.trim();
    return url.endsWith('/') ? url : `${url}/`;
  }

  // Try to get from environment variables
  // In Next.js, NEXT_PUBLIC_ vars are available via process.env in both client and server
  let envUrl: string | undefined;

  if (typeof process !== 'undefined' && process.env) {
    envUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.REACT_APP_API_BASE_URL ||
      process.env.API_BASE_URL;
  }

  if (envUrl && envUrl.trim()) {
    const url = envUrl.trim();
    return url.endsWith('/') ? url : `${url}/`;
  }

  return '/';
};

/**
 * Generate API headers
 */
export const generateApiHeaders = (
  headersArg?: ApiRequqestInit['headers'] | false
) => {
  const headers =
    headersArg !== false ? headersArg || API_DEFAULT_HEADERS : undefined;

  const apiHeaders = new Headers({
    ...API_MANDATORY_HEADERS,
    ...headers,
  });
  return apiHeaders;
};

export const parseApiResponse = async (response: Response) => {
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    return data;
  } catch {
    return text;
  }
};

export type ExecuteApiRequestInit<T> = Omit<
  ApiRequqestInit,
  'headers' | 'body'
> & {
  headers?: ApiRequqestInit['headers'] | false;
  body?: T;
};

/**
 * Execute an API request
 */
export const executeApiRequest = async <T>(
  endpoint: string,
  init: ExecuteApiRequestInit<T>
): Promise<Response> => {
  const { body: bodyArg, headers: headersArg, method, query } = init;
  const queryParams = new URLSearchParams(query);
  const endpointQuery = queryParams ? `${endpoint}?${queryParams}` : endpoint;
  const headers = generateApiHeaders(headersArg);
  const body =
    headers.get('Content-Type') === 'application/json'
      ? JSON.stringify(bodyArg)
      : bodyArg;

  const fetchInit: RequestInit = {};
  if (body) fetchInit.body = body as BodyInit;
  if (headers) fetchInit.headers = headers;
  if (method) fetchInit.method = method;

  return fetch(endpointQuery, fetchInit);
};

/**
 * Log the API response
 */
export const logApiResponse = <T, U>(
  response: T,
  params: { endpoint: ApiEndpoint; init: ExecuteApiRequestInit<U> }
) => {
  printConsole(
    'log',
    'Successful API request:',
    params,
    '\n API response:',
    response
  );
};

/**
 * Log the API error
 */
export const logApiError = <T, U>(
  error: T,
  params: { endpoint: ApiEndpoint; init: ExecuteApiRequestInit<U> }
) => {
  printConsole('error', 'Failed API request:', params, '\n API error:', error);
};

/**
 * Handle an error response from the API
 */
export const handleApiError = async <U, V>(
  error: unknown,
  options: { endpoint: ApiEndpoint; init: ExecuteApiRequestInit<V> },
  failureCb?: ApiFailureCbType
): Promise<U> => {
  logApiError(error, options);
  if (failureCb) {
    const handledError = await failureCb(error);
    throw handledError;
  }
  throw error;
};

/**
 * Handle the API response status
 */
export const handleApiResponseStatus = async <T, U>(
  response: Response,
  options: { endpoint: ApiEndpoint; init: ExecuteApiRequestInit<U> },
  successCb?: ApiSuccessCbType<T>,
  failureCb?: ApiFailureCbType
): Promise<T> => {
  const errorStatusCodes: Array<number> = [
    ...Object.values(API_STATUS_CODES.CLIENT_ERROR),
    ...Object.values(API_STATUS_CODES.SERVER_ERROR),
  ];
  if (errorStatusCodes.includes(response.status)) {
    throw await handleApiError(response, options, failureCb);
  } else {
    logApiResponse(response, options);
    if (successCb) {
      return successCb(response);
    }
    const responseBody = await parseApiResponse(response);
    return responseBody;
  }
};

/**
 * Call an API endpoint and handle the response.
 *
 * (Use `failureCb` to log errors to Sentry.)
 */
export const callApi = async <T = void, U = void, V = never>(
  endpoint: ApiEndpoint,
  init: ExecuteApiRequestInit<T>,
  successCb?: ApiSuccessCbType<U>,
  failureCb?: ApiFailureCbType
): Promise<U | V> => {
  try {
    const response = await executeApiRequest(endpoint, init);
    const formattedResponse = handleApiResponseStatus(
      response,
      { endpoint, init },
      successCb,
      failureCb
    );
    return formattedResponse;
  } catch (error) {
    throw await handleApiError(error, { endpoint, init }, failureCb);
  }
};

export const defaultApiErrorHandler = (error: Error) => {
  return error;
};
