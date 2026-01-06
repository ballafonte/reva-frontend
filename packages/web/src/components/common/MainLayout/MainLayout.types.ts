import type { SidebarItem } from '../Sidebar/Sidebar.types';

export type MainLayoutProps = {
  children: React.ReactNode;
  sidebarMenuItems?: SidebarItem[];
};
