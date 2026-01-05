import { ReactNode } from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type InputProps = Omit<
  MuiTextFieldProps,
  'component' | 'variant' | 'InputProps' | 'prefix'
> & {
  error?: boolean;
  helperText?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: 'outlined' | 'filled' | 'standard';
};
