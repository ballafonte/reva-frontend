import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import type { TableColumn } from './Table.types';

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'Item 1', status: 'Active', value: 100 },
  { id: 2, name: 'Item 2', status: 'Inactive', value: 200 },
  { id: 3, name: 'Item 3', status: 'Active', value: 150 },
];

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

const WithSortingComponent = () => {
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
    />
  );
};

export const WithSorting: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: () => <WithSortingComponent />,
};

export const WithCustomRender: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: () => (
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
    />
  ),
};
