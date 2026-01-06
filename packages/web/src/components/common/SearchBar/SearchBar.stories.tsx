import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta = {
  title: 'Common/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [value, setValue] = useState('');
  return (
    <SearchBar
      value={value}
      onChange={(newValue) => {
        console.log('Search:', newValue);
        setValue(newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};
