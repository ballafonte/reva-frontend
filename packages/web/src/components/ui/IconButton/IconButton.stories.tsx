import type { Meta, StoryObj } from '@storybook/react';
import { SIZE, WHITESPACE } from '@common/theme';
import { IconButton } from './IconButton';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Icon } from '../Icon';

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
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Clicked'),
    children: <SearchIcon />,
  },
};

export const WithSizeTokens: Story = {
  args: {
    onClick: () => {},
  },
  render: () => (
    <Box
      sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      {sizeOptions.map((size) => (
        <Box key={size} sx={{ textAlign: 'center' }}>
          <IconButton onClick={() => {}} size={size}>
            <Icon component={SearchIcon} size={size} />
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
      <IconButton onClick={() => {}} size="xsm" circular>
        <Icon component={SearchIcon} size="xsm" />
      </IconButton>
      <IconButton onClick={() => {}} size="sm" circular>
        <Icon component={SearchIcon} size="sm" />
      </IconButton>
      <IconButton onClick={() => {}} size="md" circular>
        <Icon component={SearchIcon} size="md" />
      </IconButton>
      <IconButton onClick={() => {}} size="lg" circular>
        <Icon component={SearchIcon} size="lg" />
      </IconButton>
      <IconButton onClick={() => {}} size="xlg" circular>
        <Icon component={SearchIcon} size="xlg" />
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
