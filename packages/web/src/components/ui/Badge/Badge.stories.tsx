import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  CONTEXT_COLORS,
  SIZE,
  type ContextType,
  type Size,
} from '@reva-frontend/common/theme';
import { Image } from '../Image';
import { Badge } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    badgeContent: { control: false },
    children: { control: false },
    size: { control: 'radio', options: ['xsm', 'sm', 'md', 'lg', 'xlg'] },
    positionX: { control: 'radio', options: ['left', 'right'] },
    positionY: { control: 'radio', options: ['top', 'bottom'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badgeContent: '5',
    context: 'danger',
    children: <Button>Notifications</Button>,
  },
};

export const WithImage: Story = {
  args: {
    badgeContent: <CloseIcon sx={{ fontSize: '10px' }} />,
    context: 'danger',
    onClick: fn(),
    children: (
      <Image
        src="https://picsum.photos/100"
        alt="Sample"
        size={100}
        variant="rounded"
      />
    ),
  },
};

export const WithIcon: Story = {
  args: {
    badgeContent: '5',
    context: 'danger',
    children: <NotificationsIcon sx={{ fontSize: 24 }} />,
  },
};

export const WithContext: Story = {
  args: {
    badgeContent: '3',
    context: 'primary',
    children: <MailIcon sx={{ fontSize: 24 }} />,
  },
  render: () => (
    <Box
      sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}
    >
      {(Object.keys(CONTEXT_COLORS) as ContextType[]).map((contextKey) => (
        <Badge key={contextKey} badgeContent="5" context={contextKey}>
          <NotificationsIcon sx={{ fontSize: 24 }} />
        </Badge>
      ))}
    </Box>
  ),
};

export const PositionVariations: Story = {
  args: {
    badgeContent: '5',
    context: 'danger',
    children: (
      <Box
        sx={{
          width: 60,
          height: 60,
          backgroundColor: 'primary.light',
          borderRadius: 1,
        }}
      />
    ),
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Badge
          badgeContent="5"
          context="danger"
          positionX="right"
          positionY="top"
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'primary.light',
              borderRadius: 1,
            }}
          />
        </Badge>
        <Box sx={{ fontSize: '12px', color: 'text.secondary' }}>Top Right</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Badge
          badgeContent="5"
          context="danger"
          positionX="left"
          positionY="top"
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'primary.light',
              borderRadius: 1,
            }}
          />
        </Badge>
        <Box sx={{ fontSize: '12px', color: 'text.secondary' }}>Top Left</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Badge
          badgeContent="5"
          context="danger"
          positionX="right"
          positionY="bottom"
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'primary.light',
              borderRadius: 1,
            }}
          />
        </Badge>
        <Box sx={{ fontSize: '12px', color: 'text.secondary' }}>
          Bottom Right
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Badge
          badgeContent="5"
          context="danger"
          positionX="left"
          positionY="bottom"
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'primary.light',
              borderRadius: 1,
            }}
          />
        </Badge>
        <Box sx={{ fontSize: '12px', color: 'text.secondary' }}>
          Bottom Left
        </Box>
      </Box>
    </Box>
  ),
};

export const WithStringContent: Story = {
  args: {
    badgeContent: '99+',
    context: 'danger',
    children: <NotificationsIcon sx={{ fontSize: 24 }} />,
  },
};

export const ClickableBadge: Story = {
  args: {
    badgeContent: <CloseIcon sx={{ fontSize: '10px' }} />,
    context: 'danger',
    onClick: fn(),
    children: (
      <Box
        sx={{
          width: 100,
          height: 100,
          backgroundColor: 'primary.light',
          borderRadius: 1,
        }}
      />
    ),
  },
};

export const DifferentSizes: Story = {
  args: {
    badgeContent: '5',
    context: 'danger',
    children: <NotificationsIcon sx={{ fontSize: 24 }} />,
  },
  render: () => (
    <Box
      sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}
    >
      {(Object.keys(SIZE) as Size[]).map((sizeKey) => (
        <Box
          key={sizeKey}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Badge badgeContent="5" context="danger" size={sizeKey}>
            <NotificationsIcon sx={{ fontSize: 24 }} />
          </Badge>
          <Box sx={{ fontSize: '12px', color: 'text.secondary' }}>
            {sizeKey} ({SIZE[sizeKey]}px)
          </Box>
        </Box>
      ))}
    </Box>
  ),
};
