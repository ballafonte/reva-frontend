import type { ReactNode } from 'react';
import type { PanelProps } from '@/components/ui/Panel';

export type PortalHeaderBarProps = {
  position?: 'fixed' | 'sticky' | 'static';
  title?: ReactNode;
  variant?: 'default' | PanelProps['variant'];
  zIndex?: number;
};
