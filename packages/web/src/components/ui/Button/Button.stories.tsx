import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { SeverityContexts, ThemeContexts } from '@reva-frontend/common';

const colorKnobOptions = [
  ...Object.values(ThemeContexts),
  ...Object.values(SeverityContexts),
];

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: false,
      table: {
        disable: true,
      },
    },
    color: {
      control: 'select',
      options: colorKnobOptions,
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
    variant: 'contained',
    color: 'primary',
  },
};

// Outlined variant
export const Outlined: Story = {
  args: {
    children: 'Button',
    variant: 'outlined',
    color: 'primary',
  },
};

// Text variant
export const Text: Story = {
  args: {
    children: 'Button',
    variant: 'text',
    color: 'primary',
  },
};
