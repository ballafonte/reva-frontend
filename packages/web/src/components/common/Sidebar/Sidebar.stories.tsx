import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SidebarItem, SidebarProps } from './Sidebar.types';

const variantOptions = ['tile', 'contained', 'outlined', 'ghost'];

const meta = {
  title: 'Common/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    context: 'primary',
    containerVariant: 'default',
    variant: 'contained',
  },
  argTypes: {
    containerVariant: {
      control: 'radio',
      options: ['default', 'panel'],
    },
    variant: {
      control: 'select',
      options: variantOptions,
    },
    menuItems: {
      control: false,
    },
    selectedPath: {
      control: false,
    },
    onClick: {
      control: false,
    },
    style: {
      control: false,
    },
    sx: {
      control: false,
    },
    title: {
      control: false,
    },
    withToolbar: {
      control: false,
    },
    zIndex: {
      control: false,
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

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

const SidebarWrapper = ({ containerVariant, variant }: SidebarProps) => {
  const [selectedPath, setSelectedPath] = useState<string | undefined>();

  return (
    <Box sx={{ display: 'flex', height: 250 }}>
      <Sidebar
        containerVariant={containerVariant}
        menuItems={defaultMenuItems}
        selectedPath={selectedPath}
        onClick={(path) => setSelectedPath(path)}
        variant={variant}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <p>Main content area - Sidebar is on the left</p>
        <p>Selected path: {selectedPath || 'None'}</p>
      </Box>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <SidebarWrapper {...args} />,
};
