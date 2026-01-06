import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { Box } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import { SidebarItem } from './Sidebar.types';
import { useState } from 'react';

const meta = {
  title: 'Common/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
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

const SidebarWrapper = ({
  initialSelectedPath,
}: {
  initialSelectedPath?: string;
}) => {
  const [selectedPath, setSelectedPath] = useState<string | undefined>(
    initialSelectedPath
  );

  return (
    <Box sx={{ display: 'flex', height: 250 }}>
      <Sidebar
        menuItems={defaultMenuItems}
        selectedPath={selectedPath}
        onClick={(path) => setSelectedPath(path)}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <p>Main content area - Sidebar is on the left</p>
        <p>Selected path: {selectedPath || 'None'}</p>
      </Box>
    </Box>
  );
};

export const Default: Story = {
  render: () => <SidebarWrapper />,
};
