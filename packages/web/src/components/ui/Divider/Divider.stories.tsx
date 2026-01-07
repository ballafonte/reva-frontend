import type { Meta, StoryObj } from '@storybook/react';
import { Contexts } from '@reva-frontend/common/theme';
import { Divider } from './Divider';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const contextOptions = Object.values(Contexts);

const meta = {
  title: 'UI/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: contextOptions,
    },
  },
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

export const WithIcon: Story = {
  render: () => (
    <Box>
      <Divider icon={StarIcon} />
    </Box>
  ),
};

export const WithIconLeft: Story = {
  render: () => (
    <Box>
      <Divider icon={StarIcon} iconLeft />
    </Box>
  ),
};

export const WithColor: Story = {
  args: {
    color: 'primary',
  },
  render: (args) => (
    <Box>
      <Typography>Content above</Typography>
      <Divider {...args} />
      <Typography>Content below</Typography>
    </Box>
  ),
};
