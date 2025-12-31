'use client';

import { useState, useCallback, useEffect, ReactNode } from 'react';
import {
  signIn as apiSignIn,
  signUp as apiSignUp,
  signOut as apiSignOut,
  refreshToken,
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

      if (wasAuthenticated) {
        // Try to refresh the access token using the refresh token cookie
        // This will restore authentication if the user has a valid refresh token
        try {
          await refreshToken();
          // Refresh succeeded - we now have a valid access token
          // User is authenticated (user data will be available after next sign-in or API call)
          updateAuthState();
        } catch (error) {
          // Refresh token cookie is expired/invalid or doesn't exist
          // Clear the flag and auth state
          sessionStorage.removeItem('wasAuthenticated');
          authStore.clear();
          setUser(null);
          updateAuthState();
        }
      } else {
        // User was never authenticated in this session, no need to attempt refresh
        authStore.clear();
        setUser(null);
        updateAuthState();
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [updateAuthState]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const response: PostSignInResponseBody = await apiSignIn({
          email,
          passwordRaw: password,
        });

        // Set user and update auth state
        setUser(response.user);
        // Mark that user was authenticated (for refresh token attempts on next page load)
        sessionStorage.setItem('wasAuthenticated', 'true');
        // Update auth state
        setIsAuthenticated(!!authStore.getToken());
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
