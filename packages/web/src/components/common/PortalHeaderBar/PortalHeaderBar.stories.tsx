import { Box, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { MockAuthProvider } from '../../../../tests/utils/MockAuthProvider';
import { PortalHeaderBar } from './PortalHeaderBar';

const meta = {
  title: 'Common/PortalHeaderBar',
  component: PortalHeaderBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    isAuthenticated: true,
  } as any,
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
        isAuthenticated={(context.args as any).isAuthenticated ?? true}
      >
        <Story />
      </MockAuthProvider>
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
