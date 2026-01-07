import { WHITESPACE } from '@reva-frontend/common/theme';
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { IconWrapper } from '../IconWrapper';
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
    footer,
    context,
    stickyHeader = false,
    transparent = false,
    ...rest
  } = props;
  const styles = tableStyles();

  const handleSort = (columnId: string) => {
    if (onSort) {
      onSort(columnId);
    }
  };

  return (
    <TableContainer
      sx={{
        borderRadius: `${WHITESPACE.sm}px`,
        overflow: stickyHeader ? 'auto' : 'hidden',
        ...(stickyHeader && { maxHeight: '100%' }),
      }}
    >
      <MuiTable {...rest} sx={styles} stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const align = column.align || 'left';
              const justifyContent =
                align === 'center'
                  ? 'center'
                  : align === 'right'
                    ? 'flex-end'
                    : 'flex-start';

              return (
                <TableCell
                  key={column.id}
                  variant="head"
                  align={align}
                  style={{ width: column.width }}
                  context={context}
                  transparent={transparent}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent,
                      cursor: 'pointer',
                      gap: 1,
                    }}
                  >
                    {column.label}
                    {column.sortable && (
                      <span
                        onClick={() => handleSort(column.id)}
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {sortBy === column.id ? (
                          sortDirection === 'asc' ? (
                            <IconWrapper component={ExpandLess} size={16} />
                          ) : sortDirection === 'desc' ? (
                            <IconWrapper component={ExpandMore} size={16} />
                          ) : (
                            <IconWrapper component={UnfoldMoreIcon} size={16} />
                          )
                        ) : (
                          <IconWrapper component={UnfoldMoreIcon} size={16} />
                        )}
                      </span>
                    )}
                  </Box>
                </TableCell>
              );
            })}
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
                    context={context}
                    transparent={transparent}
                  >
                    {content}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        {footer && <TableFooter>{footer}</TableFooter>}
      </MuiTable>
    </TableContainer>
  );
};
