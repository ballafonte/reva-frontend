import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta = {
  title: 'UI/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    variant: 'square',
    size: 100,
    src: 'https://via.placeholder.com/100',
    alt: 'Square image',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    size: 100,
    src: 'https://via.placeholder.com/100',
    alt: 'Rounded image',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    size: 100,
    src: 'https://via.placeholder.com/100',
    alt: 'Circle image',
  },
};

export const CustomSize: Story = {
  args: {
    variant: 'circle',
    size: 150,
    src: 'https://via.placeholder.com/150',
    alt: 'Large circle image',
  },
};
