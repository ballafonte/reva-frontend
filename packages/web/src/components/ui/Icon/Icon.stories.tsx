import type { Meta, StoryObj } from '@storybook/react';
import { SIZE, Size } from '@common/theme';
import { Box } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { Icon } from './Icon';

const sizeOptions = Object.keys(SIZE) as Array<keyof typeof SIZE>;

const meta = {
  title: 'UI/Icon',
  component: Icon,
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
  },
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
      <Icon component={HomeIcon} size="xsm" />
      <Icon component={HomeIcon} size="sm" />
      <Icon component={HomeIcon} size="md" />
      <Icon component={HomeIcon} size="lg" />
      <Icon component={HomeIcon} size="xlg" />
    </Box>
  ),
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
          <Icon component={HomeIcon} size={size} />
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
