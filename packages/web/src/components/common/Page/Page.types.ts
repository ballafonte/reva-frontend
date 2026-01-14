import type { ContainerProps } from '@mui/material';
import type { ReactNode } from 'react';

export type PageHeaderProps = {
  title: string;
  onBackClick?: () => void;
  suffix?: ReactNode;
};

export type PageContainerProps = {
  children: ReactNode;
  headerProps?: PageHeaderProps;
  maxWidth?: ContainerProps['maxWidth'];
};
