import { ButtonProps as MuiButtonProps } from '@mui/material';
import { SeverityContextType, ThemeContextType } from '@reva-frontend/common';

export type ButtonContext = SeverityContextType | ThemeContextType;

export type ButtonProps = Omit<MuiButtonProps, 'color' | 'variant'> & {
  context: ButtonContext;
  disabled: boolean;
  isLoading?: boolean;
  onClick: () => void;
  variant: 'contained' | 'outlined' | 'text';
};
