'use client';

import { setApiBaseUrl, enableConsole } from '@reva-frontend/common';
import { useEffect } from 'react';

/**
 * This should be called once when the app starts
 */
export const initializeApp = () => {
  // Get the URL from environment variable, ensuring it's not empty
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || '/').trim();

  // Ensure URL ends with a slash for proper URL construction
  const normalizedUrl = apiBaseUrl.endsWith('/')
    ? apiBaseUrl
    : `${apiBaseUrl}/`;

  setApiBaseUrl(normalizedUrl);

  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_ENABLE_CONSOLE === 'true'
  ) {
    enableConsole();
  }
};

/**
 * React hook to initialize the App on mount
 * Use this in a client component that renders early (e.g., Providers)
 */
export const useInitializedApp = () => {
  useEffect(() => {
    initializeApp();
  }, []);
};
