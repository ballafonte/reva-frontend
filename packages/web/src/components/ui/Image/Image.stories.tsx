import type { Meta, StoryObj } from '@storybook/react';
import { WHITESPACE } from '@common/theme';
import { Image } from './Image';

const whitespaceOptions = Object.keys(WHITESPACE) as Array<
  keyof typeof WHITESPACE
>;

const meta = {
  title: 'UI/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['square', 'rounded', 'circle'],
    },
    size: {
      control: 'select',
      options: [...whitespaceOptions, 'custom'],
      labels: {
        ...Object.fromEntries(
          whitespaceOptions.map((key) => [
            key,
            `${key} (${WHITESPACE[key] * 2}px)`,
          ])
        ),
        custom: 'Custom (number or CSS value)',
      },
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    variant: 'square',
    size: 100,
    src: 'https://picsum.photos/200',
    alt: 'Square image',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    size: 100,
    src: 'https://picsum.photos/200',
    alt: 'Rounded image',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    size: 100,
    src: 'https://picsum.photos/200',
    alt: 'Circle image',
  },
};

export const CustomSize: Story = {
  args: {
    variant: 'circle',
    size: 150,
    src: 'https://picsum.photos/200',
    alt: 'Large circle image',
  },
  argTypes: {
    size: {
      control: 'number',
      table: { disable: true },
    },
  },
};

export const WithWhitespaceTokens: Story = {
  args: {
    src: 'https://picsum.photos/100',
    alt: 'Image with whitespace tokens',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {whitespaceOptions
        .filter((key) => key !== 'none')
        .map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <Image
              variant="circle"
              size={size}
              src="https://picsum.photos/100"
              alt={`${size} size image`}
            />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>
              {size}
              <br />({WHITESPACE[size] * 2}px)
            </div>
          </div>
        ))}
    </div>
  ),
  argTypes: {
    variant: { control: false, table: { disable: true } },
    size: { control: false, table: { disable: true } },
    src: { control: false, table: { disable: true } },
    alt: { control: false, table: { disable: true } },
  },
};
