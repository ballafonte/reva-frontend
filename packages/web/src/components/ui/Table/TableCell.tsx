import { TableCell as MuiTableCell } from '@mui/material';
import { tableCellStyles } from './TableCell.styles';
import { TableCellProps } from './TableCell.types';

export const TableCell = (props: TableCellProps) => {
  const { variant = 'body', ...rest } = props;
  const styles = tableCellStyles({ variant, ...rest });
  return <MuiTableCell {...rest} variant={variant} sx={styles} />;
};
