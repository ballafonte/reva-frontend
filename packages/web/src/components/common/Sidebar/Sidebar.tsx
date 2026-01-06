'use client';

import { Drawer, Toolbar, Box } from '@mui/material';
import { MenuItem } from '@/components/common';
import { SidebarProps } from './Sidebar.types';
const DRAWER_WIDTH = 240;

export function Sidebar({
  context = 'primary',
  menuItems = [],
  onClick,
  selectedPath,
  variant = 'contained',
}: SidebarProps) {
  const handleClick = (path: string) => {
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
          const isActive = selectedPath === item.path || item.selected;
          return (
            <MenuItem
              key={item.path}
              label={item.label}
              prefix={item.icon}
              selected={isActive}
              onClick={() => handleClick(item.path)}
              variant={!isActive ? 'ghost' : variant}
              context={!isActive ? 'plain' : context}
            />
          );
        })}
      </Box>
    </Drawer>
  );
}
