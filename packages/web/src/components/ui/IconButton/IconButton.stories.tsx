import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Contexts, SIZE, WHITESPACE } from '@common/theme';
import { IconButton } from './IconButton';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const sizeOptions = Object.keys(SIZE) as Array<keyof typeof SIZE>;
const whitespaceOptions = Object.keys(WHITESPACE) as Array<
  keyof typeof WHITESPACE
>;
const contextOptions = Object.values(Contexts);

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
    context: {
      control: 'select',
      options: contextOptions,
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'ghost', 'text'],
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
    component: SearchIcon,
    size: 'sm',
    padding: 'xsm',
  },
};

export const WithSizeTokens: Story = {
  args: {
    onClick: fn(),
    component: SearchIcon,
  },
  render: () => (
    <Box
      sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      {sizeOptions.map((size) => (
        <Box key={size} sx={{ textAlign: 'center' }}>
          <IconButton onClick={fn()} component={SearchIcon} size={size} />
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
  args: {
    onClick: fn(),
    component: SearchIcon,
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <IconButton onClick={fn()} component={SearchIcon} size="xsm" circular />
      <IconButton onClick={fn()} component={SearchIcon} size="sm" circular />
      <IconButton onClick={fn()} component={SearchIcon} size="md" circular />
      <IconButton onClick={fn()} component={SearchIcon} size="lg" circular />
      <IconButton onClick={fn()} component={SearchIcon} size="xlg" circular />
    </Box>
  ),
};

export const DifferentIcons: Story = {
  args: {
    onClick: fn(),
    component: SearchIcon,
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton onClick={fn()} component={SearchIcon} />
      <IconButton onClick={fn()} component={CloseIcon} />
      <IconButton onClick={fn()} component={GridViewIcon} />
      <IconButton onClick={fn()} component={MoreVertIcon} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    onClick: fn(),
    component: SearchIcon,
    disabled: true,
  },
};

export const Colored: Story = {
  args: {
    onClick: fn(),
    component: SearchIcon,
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton onClick={fn()} component={SearchIcon} context="primary" />
      <IconButton onClick={fn()} component={CloseIcon} context="secondary" />
      <IconButton onClick={fn()} component={CloseIcon} context="tertiary" />
    </Box>
  ),
};

export const Variants: Story = {
  args: {
    onClick: fn(),
    component: SearchIcon,
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ minWidth: '100px', fontSize: '12px' }}>Contained:</Box>
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="contained"
          context="primary"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="contained"
          context="secondary"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="contained"
          context="success"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="contained"
          context="danger"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ minWidth: '100px', fontSize: '12px' }}>Outlined:</Box>
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="outlined"
          context="primary"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="outlined"
          context="secondary"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="outlined"
          context="success"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="outlined"
          context="danger"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ minWidth: '100px', fontSize: '12px' }}>Ghost:</Box>
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="ghost"
          context="primary"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="ghost"
          context="secondary"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="ghost"
          context="success"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="ghost"
          context="danger"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ minWidth: '100px', fontSize: '12px' }}>Text:</Box>
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="text"
          context="primary"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="text"
          context="secondary"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="text"
          context="success"
        />
        <IconButton
          onClick={fn()}
          component={SearchIcon}
          variant="text"
          context="danger"
        />
      </Box>
    </Box>
  ),
};
