import {
  AuthContext,
  authStore,
  type AuthContextType,
} from '@reva-frontend/common';
import React, { useEffect, useState } from 'react';

/**
 * Mock AuthProvider that can be controlled via Storybook args
 */
export const MockAuthProvider = ({
  children,
  isAuthenticated: controlledAuth,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(controlledAuth);

  useEffect(() => {
    setIsAuthenticated(controlledAuth);
    if (controlledAuth) {
      authStore.setToken('mock-token-for-storybook');
    } else {
      authStore.clear();
    }
  }, [controlledAuth]);

  const value: AuthContextType = {
    user: isAuthenticated
      ? {
          id: '1',
          email: 'user@example.com',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : null,
    isAuthenticated,
    isLoading: false,
    signIn: async () => {},
    signUp: async () => {},
    logout: async () => {
      authStore.clear();
      setIsAuthenticated(false);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
