import { ContextType } from '@reva-frontend/common';
// import { MenuItemProps } from '../Menu';

export type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

export type SidebarProps = {
  context?: ContextType;
  // variant?: MenuItemProps['variant'];
  onClick?: (key: string) => void;
  menuItems?: SidebarItem[];
};
