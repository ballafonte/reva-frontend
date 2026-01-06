import { Box, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockAuthProvider } from '../../../../tests/utils/MockAuthProvider';
import { AuthGuard } from './AuthGuard';

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
