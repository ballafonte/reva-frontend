import { ContextType } from '@reva-frontend/common/theme';
import { ReactNode } from 'react';

export type ChipProps = {
  label: string;
  context?: ContextType;
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
};
