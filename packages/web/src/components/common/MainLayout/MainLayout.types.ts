import type { PanelProps } from '@/components/ui/Panel';
import type { SidebarItem } from '../Sidebar/Sidebar.types';

export type MainLayoutProps = {
  children: React.ReactNode;
  headerOnTop?: boolean;
  sidebarMenuItems?: SidebarItem[];
  variant?: 'default' | PanelProps['variant'];
};
