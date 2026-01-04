import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Work',
    context: 'primary',
  },
};

export const WithDelete: Story = {
  args: {
    label: 'Source',
    context: 'primary',
    onDelete: () => console.log('Deleted'),
  },
};

export const Outlined: Story = {
  args: {
    label: 'Font',
    context: 'primary',
    variant: 'outlined',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Tag',
    context: 'primary',
    size: 'small',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Work',
    context: 'primary',
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Tag label="Work" context="primary" />
      <Tag label="Source" context="info" />
      <Tag label="Font" context="success" />
    </Box>
  ),
};
