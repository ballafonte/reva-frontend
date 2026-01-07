'use client';

import { COMPONENT_LAYERS } from '@reva-frontend/common/theme';
import { Drawer, Toolbar, Box, Typography } from '@mui/material';
import { MenuItem } from '@/components/common';
import { SidebarProps } from './Sidebar.types';
import { Panel } from '@/components/ui/Panel';

const DRAWER_WIDTH = 240;

export function Sidebar({
  context = 'primary',
  containerVariant = 'default',
  menuItems = [],
  onClick,
  selectedPath,
  style,
  sx,
  title,
  variant = 'contained',
  withToolbar,
  zIndex = COMPONENT_LAYERS.FLOATS,
}: SidebarProps) {
  const handleClick = (path: string) => {
    onClick?.(path);
  };

  const renderChildren = () => (
    <>
      {title && (
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      )}
      {!title && withToolbar && <Toolbar />}
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
    </>
  );

  if (containerVariant === 'panel') {
    return (
      <Panel
        padding="xsm"
        style={style}
        sx={{ ...sx, flexShrink: 0, m: 1, width: DRAWER_WIDTH, zIndex }}
      >
        {renderChildren()}
      </Panel>
    );
  }

  return (
    <Drawer
      variant="permanent"
      style={style}
      sx={{
        ...sx,
        flexShrink: 0,
        width: DRAWER_WIDTH,
        zIndex,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', p: 1 }}>{renderChildren()}</Box>
    </Drawer>
  );
}
