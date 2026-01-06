import { Info as InfoIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton } from '../IconButton';
import { IconWrapper } from '../IconWrapper';
import { Chip } from './Chip';

const meta = {
  title: 'UI/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium'] },
    prefix: { control: false },
    suffix: { control: false },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const ChipPrefix = () => <IconWrapper component={InfoIcon} size="xsm" />;

const ChipSuffix = () => (
  <IconButton
    onClick={fn()}
    component={CancelIcon}
    padding="none"
    size="xsm"
    circular
  />
);

export const Default: Story = {
  args: {
    label: 'Work',
    context: 'primary',
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Source',
    context: 'primary',
    suffix: <ChipSuffix />,
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Work',
    context: 'primary',
    prefix: <ChipPrefix />,
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Tag',
    context: 'primary',
    prefix: <ChipPrefix />,
    suffix: <ChipSuffix />,
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
    label: 'Small Chip',
    context: 'primary',
    size: 'small',
  },
};

export const DifferentColors: Story = {
  args: {
    label: 'Work',
    context: 'primary',
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Chip label="Work" context="primary" />
      <Chip label="Source" context="info" />
      <Chip label="Font" context="success" />
    </Box>
  ),
};
