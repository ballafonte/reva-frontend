import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Clicked'),
    children: <SearchIcon />,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <IconButton onClick={() => {}} size="small">
        <SearchIcon />
      </IconButton>
      <IconButton onClick={() => {}} size="medium">
        <SearchIcon />
      </IconButton>
      <IconButton onClick={() => {}} size="large">
        <SearchIcon />
      </IconButton>
    </Box>
  ),
};

export const DifferentIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton onClick={() => {}}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={() => {}}>
        <CloseIcon />
      </IconButton>
      <IconButton onClick={() => {}}>
        <GridViewIcon />
      </IconButton>
      <IconButton onClick={() => {}}>
        <MoreVertIcon />
      </IconButton>
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    onClick: () => {},
    disabled: true,
    children: <SearchIcon />,
  },
};

export const Colored: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton onClick={() => {}} color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton onClick={() => {}} color="secondary">
        <CloseIcon />
      </IconButton>
      <IconButton onClick={() => {}} color="default">
        <CloseIcon />
      </IconButton>
    </Box>
  ),
};
