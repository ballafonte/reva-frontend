import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { List } from './List';
import { ListItem } from './ListItem';
import { ListItemText } from '@mui/material';

const meta = {
  title: 'UI/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemText primary="Item 1" secondary="Secondary text" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 2" secondary="Secondary text" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 3" secondary="Secondary text" />
      </ListItem>
    </List>
  ),
};

export const WithSelected: Story = {
  render: () => (
    <List>
      <ListItem selected>
        <ListItemText
          primary="Selected Item"
          secondary="This item is selected"
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 2" secondary="Secondary text" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 3" secondary="Secondary text" />
      </ListItem>
    </List>
  ),
};

export const Dense: Story = {
  render: () => (
    <List dense>
      <ListItem>
        <ListItemText primary="Dense Item 1" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Dense Item 2" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Dense Item 3" />
      </ListItem>
    </List>
  ),
};

const WithListItemButtonDemo = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    console.log(`Clicked item ${index}`);
  };

  return (
    <List>
      <ListItem selected={selectedIndex === 0} onClick={() => handleClick(0)}>
        <ListItemText
          primary="Clickable Item 1"
          secondary="Uses ListItemButton (has onClick)"
        />
      </ListItem>
      <ListItem selected={selectedIndex === 1} onClick={() => handleClick(1)}>
        <ListItemText
          primary="Clickable Item 2 (Selected)"
          secondary="Uses ListItemButton (has onClick and selected)"
        />
      </ListItem>
      <ListItem selected={selectedIndex === 2} onClick={() => handleClick(2)}>
        <ListItemText
          primary="Clickable Item 3"
          secondary="Uses ListItemButton (has onClick)"
        />
      </ListItem>
      <ListItem selected>
        <ListItemText
          primary="Selected Item (No onClick)"
          secondary="Uses ListItemButton (has selected prop only)"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Regular Item"
          secondary="Uses regular ListItem (no onClick or selected)"
        />
      </ListItem>
    </List>
  );
};

export const WithListItemButton: Story = {
  render: () => <WithListItemButtonDemo />,
};
