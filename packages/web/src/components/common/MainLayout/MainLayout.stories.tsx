import type { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from './MainLayout';
import { AuthProvider } from '@reva-frontend/common';
import { Box, Typography } from '@mui/material';

const meta = {
  title: 'Common/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  render: () => (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Main Content</Typography>
        <Typography variant="body1">
          This is the main content area. The sidebar will appear when
          authenticated.
        </Typography>
      </Box>
    </MainLayout>
  ),
};
