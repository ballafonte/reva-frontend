import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type InputProps = Omit<MuiTextFieldProps, 'variant'> & {
  variant?: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  helperText?: string;
};
