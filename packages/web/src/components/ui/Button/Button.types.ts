import { ContextType } from '@common/theme';
import { ButtonProps as MuiButtonProps } from '@mui/material';

export type ButtonProps = Omit<MuiButtonProps, 'color' | 'variant'> & {
  context?: ContextType;
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'ghost' | 'text';
};
