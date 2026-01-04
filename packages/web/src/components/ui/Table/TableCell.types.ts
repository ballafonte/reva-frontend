import { TableCellProps as MuiTableCellProps } from '@mui/material';

export type TableCellProps = MuiTableCellProps & {
  variant?: 'head' | 'body' | 'footer';
};
