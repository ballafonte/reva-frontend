import { TableCell as MuiTableCell } from '@mui/material';
import { tableCellStyles } from './TableCell.styles';
import { TableCellProps } from './TableCell.types';

export const TableCell = (props: TableCellProps) => {
  const { variant = 'body', transparent, context, ...rest } = props;
  const styles = tableCellStyles({ variant, transparent, context });
  return <MuiTableCell {...rest} variant={variant} sx={styles} />;
};
