import { render, screen } from '@tests/utils/test-utils';
import { AuthGuard } from '@/components/common/AuthGuard/AuthGuard';

describe('AuthGuard', () => {
  it('should render children when authenticated', () => {
    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
      { isAuthenticated: true }
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should not render children when not authenticated', () => {
    // Mock authStore.getToken to return null when not authenticated
    const { authStore } = require('@reva-frontend/common');
    const getTokenSpy = jest.spyOn(authStore, 'getToken');
    getTokenSpy.mockReturnValue(null);

    const { container } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
      { isAuthenticated: false }
    );

    // AuthGuard returns null when not authenticated, so container should be empty
    expect(container.firstChild).toBeNull();

    getTokenSpy.mockRestore();
  });
});
