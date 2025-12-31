'use client';

import { useState, useCallback, useEffect, ReactNode } from 'react';
import {
  signIn as apiSignIn,
  signOut as apiSignOut,
  type PostSignInResponseBody,
  authStore,
} from '@reva-frontend/common';
import { AuthContext, type AuthContextType } from './AuthContext';

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated based on token presence
  const isAuthenticated = !!authStore.getToken() && !!user;

  // Initialize auth state on mount
  useEffect(() => {
    // Check if token exists in memory (from previous session)
    const token = authStore.getToken();
    if (token) {
      // Token exists but we don't have user data
      // In a real app, you might want to validate the token here
      // For now, we'll just set loading to false
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response: PostSignInResponseBody = await apiSignIn(email, password);
      setUser(response.user);
    } catch (error) {
      // Clear any partial state on error
      authStore.clear();
      setUser(null);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiSignOut();
    } catch (error) {
      // Even if logout fails, clear local state
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      authStore.clear();
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
