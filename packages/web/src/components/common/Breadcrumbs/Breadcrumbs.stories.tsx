import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Common/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Concept Font', href: '/concept-font' },
      { label: 'Maszeh' },
    ],
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      {
        label: 'Home',
        onClick: () => console.log('Home clicked'),
      },
      {
        label: 'Documents',
        onClick: () => console.log('Documents clicked'),
      },
      { label: 'Current Page' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Item' },
    ],
    separator: '/',
  },
};
