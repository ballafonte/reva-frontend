import type { Meta, StoryObj } from '@storybook/react';
import { AuthGuard } from './AuthGuard';
import { AuthProvider } from '@reva-frontend/common';
import { Box, Typography } from '@mui/material';

const meta = {
  title: 'Common/AuthGuard',
  component: AuthGuard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
} satisfies Meta<typeof AuthGuard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AuthGuard>
      <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant="h6">Protected Content</Typography>
        <Typography variant="body1">
          This content is only visible when authenticated.
        </Typography>
      </Box>
    </AuthGuard>
  ),
} as unknown as Story;
