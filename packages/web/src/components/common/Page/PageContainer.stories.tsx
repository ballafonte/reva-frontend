import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@/components/ui';
import { PageContainer } from './PageContainer';

const meta = {
  title: 'Common/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width of the container',
    },
    headerProps: {
      control: false,
      description: 'Props for the page header',
    },
    children: {
      control: false,
      description: 'Page content',
    },
  },
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <Box>
    <Typography variant="body1" sx={{ mb: 2 }}>
      This is sample page content. You can add any content here.
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Typography>
  </Box>
);

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const WithHeader: Story = {
  args: {
    headerProps: {
      title: 'Page Title',
    },
    children: <SampleContent />,
  },
};

export const WithBackButton: Story = {
  args: {
    headerProps: {
      title: 'User Details',
      onBackClick: () => console.log('Back clicked'),
    },
    children: <SampleContent />,
  },
};

export const WithSuffix: Story = {
  args: {
    headerProps: {
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
    children: <SampleContent />,
  },
};

export const WithBackButtonAndSuffix: Story = {
  args: {
    headerProps: {
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
    children: <SampleContent />,
  },
};

const ListContent = () => {
  const items = [
    { id: '1', name: 'Item 1', description: 'Description for item 1' },
    { id: '2', name: 'Item 2', description: 'Description for item 2' },
    { id: '3', name: 'Item 3', description: 'Description for item 3' },
  ];

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={item.name} secondary={item.description} />
        </ListItem>
      ))}
    </List>
  );
};

export const WithListContent: Story = {
  args: {
    headerProps: {
      title: 'Items',
      suffix: (
        <IconButton
          aria-label="add item"
          component={AddIcon}
          context="primary"
          onClick={() => console.log('Add clicked')}
        />
      ),
    },
    children: <ListContent />,
  },
};

export const WithMultipleActions: Story = {
  args: {
    headerProps: {
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
            aria-label="delete"
            component={DeleteIcon}
            context="danger"
            onClick={() => console.log('Delete clicked')}
          />
        </>
      ),
    },
    children: <SampleContent />,
  },
};

export const DifferentMaxWidths: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((maxWidth) => (
        <PageContainer
          key={maxWidth}
          maxWidth={maxWidth}
          headerProps={{ title: `Max Width: ${maxWidth}` }}
        >
          <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="body2">
              This container has maxWidth set to &quot;{maxWidth}&quot;
            </Typography>
          </Box>
        </PageContainer>
      ))}
    </Box>
  ),
  argTypes: {
    maxWidth: { control: false, table: { disable: true } },
    headerProps: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
  },
};

export const LongContent: Story = {
  args: {
    headerProps: {
      title: 'Long Content Page',
    },
    children: (
      <Box>
        {Array.from({ length: 10 }, (_, i) => (
          <Typography key={i} variant="body1" sx={{ mb: 2 }}>
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris.
          </Typography>
        ))}
      </Box>
    ),
  },
};
