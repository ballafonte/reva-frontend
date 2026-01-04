import { TableRow as MuiTableRow } from '@mui/material';
import { tableRowStyles } from './TableRow.styles';
import { TableRowProps } from './TableRow.types';

export const TableRow = (props: TableRowProps) => {
  const { hover = false, selected = false, ...rest } = props;
  const styles = tableRowStyles({ hover, selected, ...rest });
  return (
    <MuiTableRow {...rest} hover={hover} selected={selected} sx={styles} />
  );
};
