import { ContextType } from '@reva-frontend/common';
// import { MenuItemProps } from '../Menu';

export type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  selected?: boolean;
};

export type SidebarProps = {
  context?: ContextType;
  // variant?: MenuItemProps['variant'];
  onClick?: (path: string) => void;
  menuItems?: SidebarItem[];
  selectedPath?: string;
};
