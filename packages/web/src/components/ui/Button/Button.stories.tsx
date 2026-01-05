import { Contexts } from '@common/theme';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const contextKnobOptions = Object.values(Contexts);

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: false,
      table: {
        disable: true,
      },
    },
    context: {
      control: 'select',
      options: contextKnobOptions,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Contained variant
export const Contained: Story = {
  args: {
    children: 'Button',
    context: 'primary',
    variant: 'contained',
    onClick: fn(),
  },
};

// Outlined variant
export const Outlined: Story = {
  args: {
    children: 'Button',
    context: 'primary',
    variant: 'outlined',
    onClick: fn(),
  },
};

// Text variant
export const Text: Story = {
  args: {
    children: 'Button',
    context: 'primary',
    variant: 'text',
    onClick: fn(),
  },
};
