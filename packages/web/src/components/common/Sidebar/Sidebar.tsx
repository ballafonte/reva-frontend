'use client';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import { Drawer, Toolbar, Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { MenuItem } from '@/components/common';
import { SidebarProps } from './Sidebar.types';
const DRAWER_WIDTH = 240;

const defaultMenuItems = [
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

export function Sidebar(props: SidebarProps) {
  const {
    menuItems = defaultMenuItems,
    context = 'primary',
    // variant = 'ghost',
    onClick,
  } = props;
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClick?.(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', p: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <MenuItem
              key={item.path}
              label={item.label}
              prefix={item.icon}
              selected={isActive}
              onClick={() => handleNavigation(item.path)}
              variant={!isActive ? 'ghost' : 'contained'}
              context={!isActive ? 'plain' : context}
            />
          );
        })}
      </Box>
    </Drawer>
  );
}
