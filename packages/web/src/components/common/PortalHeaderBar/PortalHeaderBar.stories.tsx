import type { Meta, StoryObj } from '@storybook/react';
import { PortalHeaderBar } from './PortalHeaderBar';
import { AuthProvider } from '@reva-frontend/common';
import { Box, Typography } from '@mui/material';

const meta = {
  title: 'Common/PortalHeaderBar',
  component: PortalHeaderBar,
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
} satisfies Meta<typeof PortalHeaderBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <PortalHeaderBar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Page Content</Typography>
        <Typography variant="body1">
          The header bar appears at the top when authenticated.
        </Typography>
      </Box>
    </>
  ),
};
