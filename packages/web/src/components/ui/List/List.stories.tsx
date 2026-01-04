import type { Meta, StoryObj } from '@storybook/react';
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
