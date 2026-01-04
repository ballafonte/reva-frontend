import { ReactNode } from 'react';
import { TableProps as MuiTableProps } from '@mui/material';

export type SortDirection = 'asc' | 'desc' | false;

export type TableColumn<T = any> = {
  id: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => ReactNode;
  width?: number | string;
};

export type TableProps<T = any> = Omit<MuiTableProps, 'children'> & {
  columns: TableColumn<T>[];
  data: T[];
  sortBy?: string;
  sortDirection?: SortDirection;
  onSort?: (columnId: string) => void;
  stickyHeader?: boolean;
};
