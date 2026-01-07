import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import { Contexts, ContextType } from '@reva-frontend/common/theme';
import EditIcon from '@mui/icons-material/Edit';
import LabelIcon from '@mui/icons-material/Label';
import { Button, Chip, Image } from '@/components/ui';
import React from 'react';
import { Timeline } from './Timeline';
import { TimelineNodeProps } from './TimelineNode.types';

const meta = {
  title: 'Common/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    nodes: {
      control: false,
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to create sample nodes
const createSampleNodes = (
  overrides?: Partial<TimelineNodeProps>[]
): TimelineNodeProps[] => {
  const baseNodes: TimelineNodeProps[] = [
    {
      timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      timeFormat: 'medium',
      context: Contexts.PRIMARY,
      transparent: false,
      children: (
        <Box>
          <Typography variant="body2">
            You shared edit access to{' '}
            <strong style={{ color: '#0D6EFD' }}>Miko</strong>
          </Typography>
        </Box>
      ),
    },
    {
      timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      timeFormat: 'medium',
      context: Contexts.PRIMARY,
      transparent: false,
      children: (
        <Box>
          <Typography variant="body2">
            You shared edit access to{' '}
            <strong style={{ color: '#0D6EFD' }}>Ashley</strong>
          </Typography>
        </Box>
      ),
    },
    {
      timestamp: new Date('2022-04-01').toISOString(),
      timeFormat: 'long',
      context: Contexts.SUCCESS,
      transparent: false,
      children: (
        <Box>
          <Typography variant="body2">
            You changed{' '}
            <strong style={{ color: '#0D6EFD' }}>Maszeh.glyph</strong>
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              mt: 1,
              padding: '4px 8px',
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
            }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">Maszeh.glyph</Typography>
          </Box>
        </Box>
      ),
    },
    {
      timestamp: new Date('2022-02-21').toISOString(),
      timeFormat: 'long',
      context: Contexts.INFO,
      transparent: false,
      children: (
        <Box>
          <Typography variant="body2">
            You added tag <strong style={{ color: '#0D6EFD' }}>Work</strong>{' '}
            <strong style={{ color: '#0D6EFD' }}>+2</strong>
          </Typography>
        </Box>
      ),
    },
  ];

  if (overrides) {
    return baseNodes.map((node, index) => ({
      ...node,
      ...(overrides[index] || {}),
    }));
  }

  return baseNodes;
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    nodes: createSampleNodes(),
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    nodes: createSampleNodes(),
  },
  render: (args) => (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <Timeline {...args} />
    </Box>
  ),
};

export const WithContextColors: Story = {
  args: {
    orientation: 'vertical',
    nodes: [],
  },
  render: () => {
    const contextOptions: ContextType[] = [
      Contexts.PRIMARY,
      Contexts.SECONDARY,
      Contexts.TERTIARY,
      Contexts.SUCCESS,
      Contexts.WARNING,
      Contexts.DANGER,
      Contexts.INFO,
    ];

    const nodes: TimelineNodeProps[] = contextOptions.map((context, index) => ({
      timestamp: new Date(Date.now() - index * 86400000).toISOString(),
      timeFormat: 'medium',
      context,
      transparent: false,
      children: (
        <Typography variant="body2">Action with {context} context</Typography>
      ),
    }));

    return <Timeline nodes={nodes} orientation="vertical" />;
  },
};

export const TransparentBackgrounds: Story = {
  args: {
    orientation: 'vertical',
    nodes: [],
  },
  render: () => {
    const nodes: TimelineNodeProps[] = [
      {
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        timeFormat: 'medium',
        context: Contexts.PRIMARY,
        transparent: true,
        children: (
          <Typography variant="body2">
            Transparent background with context
          </Typography>
        ),
      },
      {
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        timeFormat: 'medium',
        context: Contexts.PRIMARY,
        transparent: false,
        children: (
          <Typography variant="body2">
            Colored background with context
          </Typography>
        ),
      },
      {
        timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
        timeFormat: 'medium',
        transparent: true,
        children: (
          <Typography variant="body2">
            Transparent background, no context
          </Typography>
        ),
      },
    ];

    return <Timeline nodes={nodes} orientation="vertical" />;
  },
};

export const DifferentTimeFormats: Story = {
  args: {
    orientation: 'vertical',
    nodes: [],
  },
  render: () => {
    const now = new Date();
    const nodes: TimelineNodeProps[] = [
      {
        timestamp: now.toISOString(),
        timeFormat: 'short',
        context: Contexts.INFO,
        transparent: false,
        children: (
          <Typography variant="body2">Short format timestamp</Typography>
        ),
      },
      {
        timestamp: new Date(now.getTime() - 86400000).toISOString(),
        timeFormat: 'medium',
        context: Contexts.INFO,
        transparent: false,
        children: (
          <Typography variant="body2">Medium format timestamp</Typography>
        ),
      },
      {
        timestamp: new Date(now.getTime() - 2 * 86400000).toISOString(),
        timeFormat: 'long',
        context: Contexts.INFO,
        transparent: false,
        children: (
          <Typography variant="body2">Long format timestamp</Typography>
        ),
      },
      {
        timestamp: new Date(now.getTime() - 3 * 86400000).toISOString(),
        timeFormat: 'full',
        context: Contexts.INFO,
        transparent: false,
        children: (
          <Typography variant="body2">Full format timestamp</Typography>
        ),
      },
    ];

    return <Timeline nodes={nodes} orientation="vertical" />;
  },
};

export const WithComplexContent: Story = {
  args: {
    orientation: 'vertical',
    nodes: [],
  },
  render: () => {
    const nodes: TimelineNodeProps[] = [
      {
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        timeFormat: 'medium',
        context: Contexts.PRIMARY,
        transparent: false,
        children: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Image
              alt="User"
              size="sm"
              src="https://thispersondoesnotexist.com/"
              variant="circle"
            />
            <Typography variant="body2">User action with icon</Typography>
          </Box>
        ),
      },
      {
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        timeFormat: 'medium',
        context: Contexts.PRIMARY,
        transparent: false,
        children: (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              You shared edit access to{' '}
              <strong style={{ color: '#0D6EFD' }}>Miko</strong>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button onClick={() => {}} variant="outlined" size="small">
                Edit
              </Button>
              <Button onClick={() => {}} variant="ghost" size="small">
                View
              </Button>
            </Box>
          </Box>
        ),
      },
      {
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        timeFormat: 'medium',
        context: Contexts.SUCCESS,
        transparent: false,
        children: (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              File uploaded successfully
            </Typography>
            <Chip
              context="plain"
              label="document.pdf"
              prefix={<EditIcon fontSize="small" />}
              size="small"
            />
          </Box>
        ),
      },
      {
        timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
        timeFormat: 'medium',
        context: Contexts.INFO,
        transparent: false,
        children: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LabelIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">Tag action with icon</Typography>
          </Box>
        ),
      },
    ];

    return <Timeline nodes={nodes} orientation="vertical" />;
  },
};

export const SingleNode: Story = {
  args: {
    orientation: 'vertical',
    nodes: [
      {
        timestamp: new Date().toISOString(),
        timeFormat: 'medium',
        context: Contexts.INFO,
        transparent: false,
        children: <Typography variant="body2">Single timeline node</Typography>,
      },
    ],
  },
};
