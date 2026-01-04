import { DividerProps as MuiDividerProps } from '@mui/material';

export type DividerProps = MuiDividerProps & {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
};
