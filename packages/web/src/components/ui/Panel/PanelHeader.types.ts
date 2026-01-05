import { BoxProps } from '@mui/material';
import type { ReactNode } from 'react';

export type PanelHeaderProps = BoxProps & {
  title?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};
