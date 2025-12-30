/**
 * API configuration utilities
 */

/**
 * Get the API base URL from environment variables
 * 
 * Supports:
 * - NEXT_PUBLIC_API_BASE_URL (for Next.js applications)
 * - REACT_APP_API_BASE_URL (for React applications)
 * - API_BASE_URL (generic fallback)
 */
export const getApiBaseUrl = (): string => {
  // Check for Next.js environment variable (NEXT_PUBLIC_)
  // This works in both client and server components
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  
  // Check for React environment variable (REACT_APP_)
  if (typeof process !== 'undefined' && process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Check for generic API_BASE_URL
  if (typeof process !== 'undefined' && process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }
  
  return '/';
};

