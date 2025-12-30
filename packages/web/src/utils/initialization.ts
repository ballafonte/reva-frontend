'use client';

import { setApiBaseUrl } from '@reva-frontend/common';
import { useEffect } from 'react';

/**
 * Initialize API configuration on the client side
 * This should be called once when the app starts
 */
export const initializeApp = () => {
  // Get the URL from environment variable, ensuring it's not empty
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || '/').trim();
  
  // Ensure URL ends with a slash for proper URL construction
  const normalizedUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`;
  
  setApiBaseUrl(normalizedUrl);
};

/**
 * React hook to initialize API on component mount
 * Use this in a client component that renders early (e.g., Providers)
 */
export const useInitializedApp = () => {
  useEffect(() => {
    initializeApp();
  }, []);
};