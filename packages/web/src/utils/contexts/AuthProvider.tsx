'use client';

import { useState, useCallback, useEffect, ReactNode } from 'react';
import {
  signIn as apiSignIn,
  signUp as apiSignUp,
  signOut as apiSignOut,
  refreshToken as apiRefreshToken,
  type PostSignInResponseBody,
  authStore,
  printConsole,
} from '@reva-frontend/common';
import { AuthContext, type AuthContextType } from './AuthContext';

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Update isAuthenticated when token changes
  const updateAuthState = useCallback(() => {
    setIsAuthenticated(!!authStore.getToken());
  }, []);

  // Handle the response from the auth API
  const handleAuthResponse = useCallback((response: PostSignInResponseBody) => {
    // Mark that user was authenticated FIRST (before checking token)
    // This prevents initializeAuth from clearing the token
    sessionStorage.setItem('wasAuthenticated', 'true');

    // Set user and update auth state
    setUser(response.user);

    // Update auth state - check token after setting sessionStorage
    const token = authStore.getToken();

    // If token is missing, it might have been cleared by initializeAuth
    // Re-store it from the response if needed
    if (!token && response.accessToken) {
      authStore.setToken(response.accessToken);
    }

    updateAuthState();
  }, []);

  // Watch for token changes as a backup mechanism
  useEffect(() => {
    const checkToken = () => {
      const token = authStore.getToken();
      const shouldBeAuthenticated = !!token;
      if (shouldBeAuthenticated !== isAuthenticated) {
        setIsAuthenticated(shouldBeAuthenticated);
      }
    };

    // Check immediately
    checkToken();

    // Check periodically (as backup)
    const interval = setInterval(checkToken, 100);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Only attempt to refresh if we have an indication the user was previously authenticated
      // We use sessionStorage to track this (cleared on logout or browser close)
      const wasAuthenticated =
        sessionStorage.getItem('wasAuthenticated') === 'true';

      // Check if token already exists (might have been set by sign-in)
      const existingToken = authStore.getToken();

      if (wasAuthenticated) {
        // Try to refresh the access token using the refresh token cookie
        // This will restore authentication if the user has a valid refresh token
        try {
          const response = await apiRefreshToken();
          // Refresh succeeded - we now have a valid access token
          // User is authenticated (user data will be available after next sign-in or API call)
          handleAuthResponse(response);
        } catch (error) {
          // Refresh token cookie is expired/invalid or doesn't exist
          // Only clear if we don't have an existing token (might have been set by sign-in)
          if (!existingToken) {
            sessionStorage.removeItem('wasAuthenticated');
            authStore.clear();
            setUser(null);
            updateAuthState();
          }
        }
      } else {
        // User was never authenticated in this session, no need to attempt refresh
        // Only clear if we don't have an existing token (might have been set by sign-in)
        if (!existingToken) {
          authStore.clear();
          setUser(null);
          updateAuthState();
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await apiSignIn({
          email,
          passwordRaw: password,
        });
        handleAuthResponse(response);
      } catch (error) {
        // Clear any partial state on error
        sessionStorage.removeItem('wasAuthenticated');
        authStore.clear();
        setUser(null);
        updateAuthState();
        throw error;
      }
    },
    [updateAuthState]
  );

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      await apiSignUp({
        email,
        passwordRaw: password,
      });
      // Sign-up doesn't automatically sign in, so we don't set user here
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiSignOut();
    } catch (error) {
      // Even if logout fails, clear local state
      printConsole('error', 'Logout error:', error);
    } finally {
      // Clear the authentication flag so we don't attempt refresh on next page load
      sessionStorage.removeItem('wasAuthenticated');
      setUser(null);
      authStore.clear();
      updateAuthState();
    }
  }, [updateAuthState]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
