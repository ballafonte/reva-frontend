import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TablePagination, TableRow } from '@mui/material';
import { usePagination } from '@reva-frontend/common';
import { Table } from './Table';
import type { TableColumn } from './Table.types';
import { Contexts, ContextType } from '@common/theme';

const contextOptions = ['default', ...Object.values(Contexts)];

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    context: {
      control: 'radio',
      options: contextOptions,
    },
    transparent: {
      control: 'boolean',
    },
    columns: {
      control: false,
    },
    data: {
      control: false,
    },
    sortBy: {
      control: false,
    },
    sortDirection: {
      control: false,
    },
    footer: {
      control: false,
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'Item 1', status: 'Active', value: 100 },
  { id: 2, name: 'Item 2', status: 'Inactive', value: 200 },
  { id: 3, name: 'Item 3', status: 'Active', value: 150 },
];

// Extended data for pagination example
const paginatedData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  value: (i + 1) * 50,
}));

const columns: TableColumn[] = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'value', label: 'Value', sortable: true, align: 'right' },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

const WithSortingComponent = ({
  context,
  transparent,
}: {
  context?: ContextType | 'default';
  transparent?: boolean;
}) => {
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | false>(
    'asc'
  );

  const handleSort = (columnId: string) => {
    if (sortBy === columnId) {
      setSortDirection(
        sortDirection === 'asc'
          ? 'desc'
          : sortDirection === 'desc'
            ? false
            : 'asc'
      );
    } else {
      setSortBy(columnId);
      setSortDirection('asc');
    }
  };

  return (
    <Table
      columns={columns}
      data={sampleData}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSort={handleSort}
      context={context === 'default' ? undefined : (context as ContextType)}
      transparent={transparent}
    />
  );
};

export const WithSorting: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: (args) => (
    <WithSortingComponent
      context={args.context as ContextType | 'default'}
      transparent={args.transparent}
    />
  ),
};

export const WithCustomRender: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: (args) => (
    <Table
      columns={[
        { id: 'name', label: 'Name' },
        {
          id: 'status',
          label: 'Status',
          render: (value) => (
            <span style={{ color: value === 'Active' ? 'green' : 'red' }}>
              {value}
            </span>
          ),
        },
        { id: 'value', label: 'Value', align: 'right' },
      ]}
      data={sampleData}
      context={
        (args.context as string | undefined) === 'default'
          ? undefined
          : (args.context as ContextType | undefined)
      }
      transparent={args.transparent}
    />
  ),
};

const WithPaginationComponent = ({
  context,
  transparent,
}: {
  context?: ContextType | 'default';
  transparent?: boolean;
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { currentItems, currentPage, nextPage, prevPage, firstPage } =
    usePagination(paginatedData, itemsPerPage);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // usePagination uses 1-based pages, TablePagination uses 0-based
    const targetPage = newPage + 1;
    if (targetPage < currentPage) {
      prevPage();
    } else if (targetPage > currentPage) {
      nextPage();
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    // Reset to first page when rows per page changes
    firstPage();
  };

  return (
    <Table
      columns={columns}
      data={currentItems}
      context={context === 'default' ? undefined : (context as ContextType)}
      transparent={transparent}
      footer={
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={columns.length}
            count={paginatedData.length}
            rowsPerPage={itemsPerPage}
            page={currentPage - 1} // Convert from 1-based to 0-based
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableRow>
      }
    />
  );
};

export const WithPagination: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: (args) => (
    <WithPaginationComponent
      context={args.context as ContextType | 'default'}
      transparent={args.transparent}
    />
  ),
};

// Extended data for sticky header example
const stickyHeaderData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  value: (i + 1) * 50,
}));

const WithStickyHeaderComponent = ({
  context,
  transparent,
}: {
  context?: ContextType | 'default';
  transparent?: boolean;
}) => {
  return (
    <div style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <Table
        columns={columns}
        data={stickyHeaderData}
        stickyHeader={true}
        context={context === 'default' ? undefined : (context as ContextType)}
        transparent={transparent}
      />
    </div>
  );
};

export const WithStickyHeader: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: (args) => (
    <WithStickyHeaderComponent
      context={args.context as ContextType | 'default'}
      transparent={args.transparent}
    />
  ),
};
