import type { ReactNode } from 'react';

export type PortalHeaderBarProps = {
  position?: 'fixed' | 'sticky' | 'static';
  title?: ReactNode;
  zIndex?: number;
};
