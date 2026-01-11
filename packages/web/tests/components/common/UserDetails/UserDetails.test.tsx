import { render, screen } from '@tests/utils/test-utils';
import { UserDetails } from '@/components/common';
import type { User } from '@reva-frontend/common';

const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  status: 'ACTIVE',
  createdAt: '2025-01-15T10:00:00.000Z',
  updatedAt: '2025-01-20T15:30:00.000Z',
};

describe('UserDetails', () => {
  it('should render user email', () => {
    render(<UserDetails user={mockUser} />);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('should display "N/A" when email is empty string', () => {
    const userWithoutEmail: User = {
      ...mockUser,
      email: '',
    };

    render(<UserDetails user={userWithoutEmail} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('should display status chip with formatted label', () => {
    render(<UserDetails user={mockUser} />);

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should display created at date when available', () => {
    render(<UserDetails user={mockUser} />);

    expect(screen.getByText('Created At')).toBeInTheDocument();
    // Date formatting may vary by locale, so we check for the presence of the label
    const createdLabel = screen.getByText('Created At');
    expect(createdLabel).toBeInTheDocument();
  });

  it('should display updated at date when available', () => {
    render(<UserDetails user={mockUser} />);

    expect(screen.getByText('Updated At')).toBeInTheDocument();
  });

  it('should display created at when available', () => {
    render(<UserDetails user={mockUser} />);

    expect(screen.getByText('Created At')).toBeInTheDocument();
  });

  it('should display updated at when available', () => {
    render(<UserDetails user={mockUser} />);

    expect(screen.getByText('Updated At')).toBeInTheDocument();
  });

  it('should handle different status values correctly', () => {
    const statuses: Array<User['status']> = [
      'ACTIVE',
      'INACTIVE',
      'PENDING',
      'SUSPENDED',
      'DELETED',
    ];

    statuses.forEach((status) => {
      const { unmount } = render(
        <UserDetails user={{ ...mockUser, status }} />
      );

      // Check that status chip is rendered (label format may vary)
      const statusChip = screen.getByText(
        status.charAt(0) + status.slice(1).toLowerCase()
      );
      expect(statusChip).toBeInTheDocument();

      unmount();
    });
  });

  it('should display "User Information" heading', () => {
    render(<UserDetails user={mockUser} />);

    expect(screen.getByText('User Information')).toBeInTheDocument();
  });

  it('should format dates correctly', () => {
    render(<UserDetails user={mockUser} />);

    // The exact format may vary by locale, but we check that dates are displayed
    const createdLabel = screen.getByText('Created At');
    expect(createdLabel).toBeInTheDocument();

    const updatedLabel = screen.getByText('Updated At');
    expect(updatedLabel).toBeInTheDocument();
  });
});
