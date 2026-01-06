import { render, screen } from '@tests/utils/test-utils';
import { Table } from '@/components/ui/Table/Table';

describe('Table', () => {
  const mockColumns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
  ];

  const mockData = [
    { id: '1', name: 'John', email: 'john@example.com' },
    { id: '2', name: 'Jane', email: 'jane@example.com' },
  ];

  it('should render table with columns and data', () => {
    render(<Table columns={mockColumns} data={mockData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('should render empty table', () => {
    render(<Table columns={mockColumns} data={[]} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
