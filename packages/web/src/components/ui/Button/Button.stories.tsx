import { Contexts } from '@common/theme';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import { Link } from '../Link';

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
      control: 'select',
      options: ['contained', 'outlined', 'ghost', 'text'],
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

// Ghost variant (renamed from text)
export const Ghost: Story = {
  args: {
    children: 'Button',
    context: 'primary',
    variant: 'ghost',
    onClick: fn(),
  },
};

// Text variant (new - looks like a link)
export const Text: Story = {
  args: {
    children: 'Button',
    context: 'primary',
    variant: 'text',
    onClick: fn(),
  },
};

// Text variant in context (shows how it looks like a link in text)
export const TextInContext: Story = {
  args: {
    onClick: fn(),
  },
  render: (args) => (
    <div style={{ maxWidth: '500px' }}>
      <p>
        This is a paragraph with a{' '}
        <Button {...args} variant="text" context="primary">
          link-like button
        </Button>{' '}
        embedded in the text. It should look like a{' '}
        <Link
          href="/example"
          target="_blank"
          rel="noopener noreferrer"
          context="info"
        >
          regular link
        </Link>{' '}
        and blend naturally with the surrounding text.
      </p>
    </div>
  ),
  argTypes: {
    variant: { control: false, table: { disable: true } },
    context: { control: false, table: { disable: true } },
  },
};
