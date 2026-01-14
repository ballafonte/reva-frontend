import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@/components/ui';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Common/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The page title',
    },
    onBackClick: {
      action: 'back clicked',
      description: 'Callback function when back button is clicked',
    },
    suffix: {
      control: false,
      description: 'Optional suffix element (e.g., action buttons)',
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page Title',
  },
};

export const WithBackButton: Story = {
  args: {
    title: 'User Details',
    onBackClick: () => console.log('Back clicked'),
  },
};

export const WithSuffix: Story = {
  args: {
    title: 'Organizations',
    suffix: (
      <IconButton
        aria-label="add organization"
        component={AddIcon}
        context="primary"
        onClick={() => console.log('Add clicked')}
      />
    ),
  },
};

export const WithBackButtonAndSuffix: Story = {
  args: {
    title: 'Edit User',
    onBackClick: () => console.log('Back clicked'),
    suffix: (
      <IconButton
        aria-label="save"
        component={EditIcon}
        context="primary"
        onClick={() => console.log('Save clicked')}
      />
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a Very Long Page Title That Might Wrap',
  },
};

export const WithMultipleSuffixButtons: Story = {
  args: {
    title: 'Platform Admins',
    suffix: (
      <>
        <IconButton
          aria-label="edit"
          component={EditIcon}
          onClick={() => console.log('Edit clicked')}
          sx={{ mr: 1 }}
        />
        <IconButton
          aria-label="add"
          component={AddIcon}
          context="primary"
          onClick={() => console.log('Add clicked')}
        />
      </>
    ),
  },
};
