import { ReactNode } from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { ContextType } from '@reva-frontend/common/theme';

export type InputProps = Omit<
  MuiTextFieldProps,
  'component' | 'variant' | 'InputProps' | 'prefix' | 'color'
> & {
  context?: ContextType;
  error?: boolean;
  helperText?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: 'outlined' | 'filled' | 'standard';
};
