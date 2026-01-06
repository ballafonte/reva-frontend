import { ReactNode } from 'react';
import { ContextType } from '@common/theme';

export type MenuItemVariant = 'tile' | 'contained' | 'outlined' | 'ghost';

export type MenuItemSize = 'sm' | 'md' | 'lg';

export type MenuItemProps = {
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: MenuItemVariant;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  context?: ContextType;
  size?: MenuItemSize;
};
