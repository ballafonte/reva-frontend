import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { tableStyles } from './Table.styles';
import { TableProps } from './Table.types';

export const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
  const {
    columns,
    data,
    sortBy,
    sortDirection = false,
    onSort,
    stickyHeader = false,
    ...rest
  } = props;
  const styles = tableStyles();

  const handleSort = (columnId: string) => {
    if (onSort) {
      onSort(columnId);
    }
  };

  return (
    <TableContainer>
      <MuiTable {...rest} sx={styles} stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                variant="head"
                align={column.align || 'left'}
                style={{ width: column.width }}
              >
                {column.label}
                {column.sortable && (
                  <span
                    onClick={() => handleSort(column.id)}
                    style={{ cursor: 'pointer', marginLeft: '4px' }}
                  >
                    {sortBy === column.id
                      ? sortDirection === 'asc'
                        ? '↑'
                        : sortDirection === 'desc'
                          ? '↓'
                          : '⇅'
                      : '⇅'}
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => {
                const value = row[column.id];
                const content = column.render
                  ? column.render(value, row)
                  : value;
                return (
                  <TableCell
                    key={column.id}
                    variant="body"
                    align={column.align || 'left'}
                  >
                    {content}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
