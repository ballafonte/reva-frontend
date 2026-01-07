'use client';

import { COMPONENT_LAYERS } from '@common/theme';
import { Drawer, Toolbar, Box, Typography } from '@mui/material';
import { MenuItem } from '@/components/common';
import { SidebarProps } from './Sidebar.types';

const DRAWER_WIDTH = 240;

export function Sidebar({
  context = 'primary',
  menuItems = [],
  onClick,
  selectedPath,
  title,
  variant = 'contained',
  withToolbar,
  zIndex = COMPONENT_LAYERS.FLOATS,
}: SidebarProps) {
  const handleClick = (path: string) => {
    onClick?.(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: DRAWER_WIDTH,
        zIndex,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      {title && (
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      )}
      {!title && withToolbar && <Toolbar />}
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
