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
    envUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
             process.env.REACT_APP_API_BASE_URL || 
             process.env.API_BASE_URL;
  }
  
  if (envUrl && envUrl.trim()) {
    const url = envUrl.trim();
    return url.endsWith('/') ? url : `${url}/`;
  }

  return '/';
};

