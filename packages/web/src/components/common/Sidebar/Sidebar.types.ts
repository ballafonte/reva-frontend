import type { SxProps, Theme } from '@mui/material/styles';
import type { ContextType } from '@reva-frontend/common';
import type { CSSProperties, ReactNode } from 'react';
import type { MenuItemProps } from '../Menu';

export type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  selected?: boolean;
};

export type SidebarProps = {
  context?: ContextType;
  containerVariant?: 'default' | 'panel';
  menuItems?: SidebarItem[];
  onClick?: (path: string) => void;
  selectedPath?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
  title?: ReactNode;
  variant?: MenuItemProps['variant'];
  withToolbar?: boolean;
  zIndex?: number;
};
