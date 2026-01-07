import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import { Box, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { MockAuthProvider } from '../../../../tests/utils/MockAuthProvider';
import { SidebarItem } from '../Sidebar/Sidebar.types';
import { MainLayout } from './MainLayout';
import type { MainLayoutProps } from './MainLayout.types';

const defaultMenuItems: SidebarItem[] = [
  {
    label: 'Jurisdictions',
    path: '/jurisdictions',
    icon: <AccountTreeIcon />,
  },
  {
    label: 'Organizations',
    path: '/organizations',
    icon: <BusinessIcon />,
  },
  {
    label: 'Platform Admins',
    path: '/platform-admins',
    icon: <AdminPanelSettingsIcon />,
  },
];

const meta = {
  title: 'Common/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    headerOnTop: false,
    isAuthenticated: true,
    variant: 'default',
  } as any,
  argTypes: {
    isAuthenticated: {
      control: 'boolean',
      description: 'Simulate authentication state',
      table: {
        category: 'Story Controls',
      },
    },
    headerOnTop: {
      control: 'boolean',
      description: 'Show the header on top of the sidebar',
      table: {
        category: 'Story Controls',
      },
    },
    variant: {
      control: 'radio',
      options: ['default', 'outlined', 'filled'],
    },
    sidebarMenuItems: {
      control: false,
    },
  } as any,
  decorators: [
    (Story, context) => (
      <MockAuthProvider
        isAuthenticated={(context.args as any).isAuthenticated ?? true}
      >
        <Story />
      </MockAuthProvider>
    ),
  ],
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof MainLayout>;

const MainLayoutWrapper = ({ headerOnTop, variant }: MainLayoutProps) => {
  return (
    <MainLayout
      headerOnTop={headerOnTop}
      sidebarMenuItems={defaultMenuItems}
      variant={variant}
    >
      <Box sx={{ p: 3, minHeight: 250 }}>
        <Typography variant="h4">Main Content</Typography>
        <Typography variant="body1">
          This is the main content area. The sidebar will appear when
          authenticated. Put 404 content here when not authenticated.
        </Typography>
      </Box>
    </MainLayout>
  );
};

export const Default: Story = {
  render: (args) => <MainLayoutWrapper {...args} />,
};
