import type { Meta, StoryObj } from '@storybook/react';
import { SIZE } from '@reva-frontend/common/theme';
import { Box } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { IconWrapper } from './IconWrapper';

const sizeOptions = Object.keys(SIZE) as Array<keyof typeof SIZE>;

const meta = {
  title: 'UI/IconWrapper',
  component: IconWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [...sizeOptions, 'custom'],
      labels: {
        ...Object.fromEntries(
          sizeOptions.map((key) => [key, `SIZE.${key} (${SIZE[key]}px)`])
        ),
        custom: 'Custom (number)',
      },
    },
    component: {
      control: false,
    },
  },
} satisfies Meta<typeof IconWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    component: FolderIcon,
  },
};

export const WithSizeTokens: Story = {
  args: {
    component: HomeIcon,
  },
  render: () => (
    <Box
      sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      {sizeOptions.map((size) => (
        <Box key={size} sx={{ textAlign: 'center' }}>
          <IconWrapper component={HomeIcon} size={size} />
          <Box sx={{ marginTop: '4px', fontSize: '12px' }}>
            SIZE.{size}
            <br />({SIZE[size]}px)
          </Box>
        </Box>
      ))}
    </Box>
  ),
  argTypes: {
    size: { control: false, table: { disable: true } },
  },
};

export const DifferentIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconWrapper component={FolderIcon} />
      <IconWrapper component={SearchIcon} />
      <IconWrapper component={HomeIcon} />
    </Box>
  ),
};

export const WithColor: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconWrapper component={FolderIcon} color="primary" />
      <IconWrapper component={SearchIcon} color="secondary" />
      <IconWrapper component={HomeIcon} color="success" />
    </Box>
  ),
};
