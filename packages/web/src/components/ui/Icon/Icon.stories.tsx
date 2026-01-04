import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { Box } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    component: FolderIcon,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Icon component={HomeIcon} fontSize="small" />
      <Icon component={HomeIcon} fontSize="medium" />
      <Icon component={HomeIcon} fontSize="large" />
    </Box>
  ),
};

export const DifferentIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Icon component={FolderIcon} />
      <Icon component={SearchIcon} />
      <Icon component={HomeIcon} />
    </Box>
  ),
};

export const WithColor: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Icon component={FolderIcon} color="primary" />
      <Icon component={SearchIcon} color="secondary" />
      <Icon component={HomeIcon} color="success" />
    </Box>
  ),
};
