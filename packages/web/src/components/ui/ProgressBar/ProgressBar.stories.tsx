import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 42,
  },
};

export const WithLabel: Story = {
  args: {
    value: 42,
    showLabel: true,
    label: '42 GB used from 256 GB',
  },
};

export const CustomHeight: Story = {
  args: {
    value: 75,
    height: 16,
  },
};

export const DifferentContext: Story = {
  args: {
    value: 60,
    context: 'success',
  },
};

export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
};
