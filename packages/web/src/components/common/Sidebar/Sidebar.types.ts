import type { ContextType } from '@reva-frontend/common';
import type { ReactNode } from 'react';
import type { MenuItemProps } from '../Menu';

export type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  selected?: boolean;
};

export type SidebarProps = {
  context?: ContextType;
  menuItems?: SidebarItem[];
  onClick?: (path: string) => void;
  selectedPath?: string;
  title?: ReactNode;
  variant?: MenuItemProps['variant'];
  withToolbar?: boolean;
  zIndex?: number;
};
