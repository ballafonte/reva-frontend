import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SIZE, WHITESPACE } from '@common/theme';
import { IconButton } from './IconButton';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconWrapper } from '../IconWrapper';

const sizeOptions = Object.keys(SIZE) as Array<keyof typeof SIZE>;
const whitespaceOptions = Object.keys(WHITESPACE) as Array<
  keyof typeof WHITESPACE
>;

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
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
    padding: {
      control: 'select',
      options: whitespaceOptions,
      labels: Object.fromEntries(
        whitespaceOptions.map((key) => [
          key,
          `WHITESPACE.${key} (${WHITESPACE[key]}px)`,
        ])
      ),
    },
    circular: {
      control: 'boolean',
    },
    component: {
      control: false,
    },
    onClick: {
      control: false,
    },
    ref: {
      control: false,
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: fn(),
    size: 'sm',
    padding: 'xsm',
  },
  render: (args) => (
    <IconButton {...args}>
      <IconWrapper component={SearchIcon} size={args.size} />
    </IconButton>
  ),
};

export const WithSizeTokens: Story = {
  args: {
    onClick: fn(),
  },
  render: () => (
    <Box
      sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      {sizeOptions.map((size) => (
        <Box key={size} sx={{ textAlign: 'center' }}>
          <IconButton onClick={fn()} size={size}>
            <IconWrapper component={SearchIcon} size={size} />
          </IconButton>
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

export const Circular: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <IconButton onClick={fn()} size="xsm" circular>
        <IconWrapper component={SearchIcon} size="xsm" />
      </IconButton>
      <IconButton onClick={fn()} size="sm" circular>
        <IconWrapper component={SearchIcon} size="sm" />
      </IconButton>
      <IconButton onClick={fn()} size="md" circular>
        <IconWrapper component={SearchIcon} size="md" />
      </IconButton>
      <IconButton onClick={fn()} size="lg" circular>
        <IconWrapper component={SearchIcon} size="lg" />
      </IconButton>
      <IconButton onClick={fn()} size="xlg" circular>
        <IconWrapper component={SearchIcon} size="xlg" />
      </IconButton>
    </Box>
  ),
};

export const DifferentIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton onClick={fn()}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={fn()}>
        <CloseIcon />
      </IconButton>
      <IconButton onClick={fn()}>
        <GridViewIcon />
      </IconButton>
      <IconButton onClick={fn()}>
        <MoreVertIcon />
      </IconButton>
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    onClick: fn(),
    disabled: true,
    children: <SearchIcon />,
  },
};

export const Colored: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton onClick={fn()} color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton onClick={fn()} color="secondary">
        <CloseIcon />
      </IconButton>
      <IconButton onClick={fn()} color="default">
        <CloseIcon />
      </IconButton>
    </Box>
  ),
};
