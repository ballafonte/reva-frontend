import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { Box } from '@mui/material';

const meta = {
  title: 'Common/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <p>Main content area - Sidebar is on the left</p>
      </Box>
    </Box>
  ),
};
