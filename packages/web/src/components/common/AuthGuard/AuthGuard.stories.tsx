import { Box, Typography } from '@mui/material';
import {
  AuthContext,
  authStore,
  type AuthContextType,
} from '@reva-frontend/common';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { AuthGuard } from './AuthGuard';

// Mock AuthProvider that can be controlled via Storybook args
const MockAuthProvider = ({
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

const meta = {
  title: 'Common/AuthGuard',
  component: AuthGuard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isAuthenticated: {
      control: 'boolean',
      description: 'Simulate authentication state',
      table: {
        category: 'Story Controls',
      },
    },
  } as any,
  decorators: [
    (Story, context) => (
      <MockAuthProvider
        isAuthenticated={(context.args as any).isAuthenticated ?? false}
      >
        <Story />
      </MockAuthProvider>
    ),
  ],
} satisfies Meta<typeof AuthGuard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAuthenticated: false,
  } as any,
  render: () => (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Toggle the &quot;isAuthenticated&quot; control below to see the guard in
        action.
      </Typography>
      <AuthGuard>
        <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="h6">Protected Content</Typography>
          <Typography variant="body1">
            This content is only visible when authenticated.
          </Typography>
        </Box>
      </AuthGuard>
    </>
  ),
} as unknown as Story;
