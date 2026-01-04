import { TableRowProps as MuiTableRowProps } from '@mui/material';

export type TableRowProps = MuiTableRowProps & {
  hover?: boolean;
  selected?: boolean;
};
