/**
 * Integration test for InactivitySignOutDialog trigger logic
 * Tests that the dialog appears on sign-in page when sessionStorage flag is set
 */

import { render, screen, waitFor } from '@tests/utils/test-utils';
import SignInPage from '@/app/sign-in/page';

// Mock next/navigation - using the same pattern as other tests
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('@/components/common/__mocks__/next-navigation');
  return {
    ...actual,
    usePathname: () => '/sign-in',
  };
});

describe('InactivitySignOutDialog Integration', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
  });

  afterEach(() => {
    // Clean up sessionStorage after each test
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
  });

  it('should show dialog when inactivitySignOut flag is set in sessionStorage', async () => {
    // Set the flag before rendering
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('inactivitySignOut', 'true');
    }

    render(<SignInPage />);

    // Wait for the dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Session Expired')).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        'You have been signed out due to inactivity. Please sign in again to continue.'
      )
    ).toBeInTheDocument();
  });

  it('should not show dialog when inactivitySignOut flag is not set', () => {
    // Ensure flag is not set
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('inactivitySignOut');
    }

    render(<SignInPage />);

    // Dialog should not appear
    expect(screen.queryByText('Session Expired')).not.toBeInTheDocument();
  });

  it('should clear sessionStorage flag after showing dialog', async () => {
    // Set the flag before rendering
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('inactivitySignOut', 'true');
    }

    render(<SignInPage />);

    // Wait for the dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Session Expired')).toBeInTheDocument();
    });

    // Flag should be cleared after dialog is shown
    await waitFor(() => {
      if (typeof sessionStorage !== 'undefined') {
        expect(sessionStorage.getItem('inactivitySignOut')).toBeNull();
      }
    });
  });
});
