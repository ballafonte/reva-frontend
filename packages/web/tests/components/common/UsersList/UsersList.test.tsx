import { render, screen, fireEvent } from '@tests/utils/test-utils';
import { UsersList } from '@/components/common';
import type { User } from '@reva-frontend/common';

const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'user1@example.com',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'user-2',
    email: 'user2@example.com',
    status: 'PENDING',
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
  },
  {
    id: 'user-3',
    email: 'user3@example.com',
    status: 'INACTIVE',
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
];

describe('UsersList', () => {
  const mockOnUserClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render list of users', () => {
    render(<UsersList users={mockUsers} onUserClick={mockOnUserClick} />);

    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    expect(screen.getByText('user3@example.com')).toBeInTheDocument();
  });

  it('should display user email as primary text', () => {
    render(<UsersList users={mockUsers} onUserClick={mockOnUserClick} />);

    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
  });

  it('should display "No email" when user email is empty string', () => {
    const usersWithoutEmail: User[] = [
      {
        id: 'user-no-email',
        email: '',
        status: 'ACTIVE',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      },
    ];

    render(
      <UsersList users={usersWithoutEmail} onUserClick={mockOnUserClick} />
    );

    expect(screen.getByText('No email')).toBeInTheDocument();
  });

  it('should call onUserClick when a user is clicked', () => {
    render(<UsersList users={mockUsers} onUserClick={mockOnUserClick} />);

    const user1Item = screen.getByText('user1@example.com').closest('li');
    expect(user1Item).toBeInTheDocument();

    fireEvent.click(user1Item!);

    expect(mockOnUserClick).toHaveBeenCalledTimes(1);
    expect(mockOnUserClick).toHaveBeenCalledWith('user-1');
  });

  it('should display status chips with correct labels', () => {
    render(<UsersList users={mockUsers} onUserClick={mockOnUserClick} />);

    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('should handle empty users array', () => {
    render(<UsersList users={[]} onUserClick={mockOnUserClick} />);

    const list = screen.queryByRole('list');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });

  it('should handle users with valid ids', () => {
    render(<UsersList users={mockUsers} onUserClick={mockOnUserClick} />);

    // All users should be rendered
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    expect(screen.getByText('user3@example.com')).toBeInTheDocument();
  });
});
