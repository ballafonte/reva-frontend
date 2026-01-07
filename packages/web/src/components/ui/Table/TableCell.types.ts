import { ContextType } from '@reva-frontend/common/theme';
import { TableCellProps as MuiTableCellProps } from '@mui/material';

export type TableCellProps = MuiTableCellProps & {
  context?: ContextType;
  variant?: 'head' | 'body' | 'footer';
  transparent?: boolean;
};
