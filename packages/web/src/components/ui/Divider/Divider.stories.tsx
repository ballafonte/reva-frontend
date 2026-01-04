import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { Box, Typography } from '@mui/material';

const meta = {
  title: 'UI/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box>
      <Typography>Content above</Typography>
      <Divider />
      <Typography>Content below</Typography>
    </Box>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ display: 'flex', height: 100 }}>
      <Typography>Left</Typography>
      <Divider orientation="vertical" flexItem />
      <Typography>Right</Typography>
    </Box>
  ),
};

export const Inset: Story = {
  render: () => (
    <Box>
      <Typography>Content above</Typography>
      <Divider variant="inset" />
      <Typography>Content below</Typography>
    </Box>
  ),
};

export const Middle: Story = {
  render: () => (
    <Box>
      <Typography>Content above</Typography>
      <Divider variant="middle" />
      <Typography>Content below</Typography>
    </Box>
  ),
};
