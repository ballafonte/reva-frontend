import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../../../src/utils/contexts/AuthContext/AuthProvider';
import { useAuthContext } from '../../../../src/utils/contexts/AuthContext/AuthContext';
import * as authApi from '../../../../src/api/auth.api';
import { authStore } from '../../../../src/utils/auth/authStore';

// Mock auth API
jest.mock('../../../../src/api/auth.api');
jest.mock('../../../../src/utils/auth/authStore', () => ({
  authStore: {
    getToken: jest.fn(),
    setToken: jest.fn(),
    clear: jest.fn(),
  },
}));

// Mock console
jest.mock('../../../../src/utils/console', () => ({
  printConsole: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';

  return Wrapper;
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    (authStore.getToken as jest.Mock).mockReturnValue(null);
  });

  it('should provide auth context', async () => {
    (authApi.refreshToken as jest.Mock).mockRejectedValue(
      new Error('No refresh token')
    );

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('signIn');
    expect(result.current).toHaveProperty('signUp');
    expect(result.current).toHaveProperty('logout');
  });

  it('should initialize as not authenticated when no token exists', async () => {
    (authApi.refreshToken as jest.Mock).mockRejectedValue(
      new Error('No refresh token')
    );

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should sign in successfully', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    const mockResponse = {
      user: mockUser,
      accessToken: 'test-token',
    };

    (authApi.signIn as jest.Mock).mockResolvedValue(mockResponse);
    (authApi.refreshToken as jest.Mock).mockRejectedValue(
      new Error('No refresh token')
    );

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });

    expect(authApi.signIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      passwordRaw: 'password',
    });
    expect(authStore.setToken).toHaveBeenCalledWith('test-token');
    // After setToken is called, getToken should return the token
    (authStore.getToken as jest.Mock).mockReturnValue('test-token');

    // Wait for state to update
    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  it('should handle sign in error', async () => {
    const error = new Error('Sign in failed');
    (authApi.signIn as jest.Mock).mockRejectedValue(error);
    (authApi.refreshToken as jest.Mock).mockRejectedValue(
      new Error('No refresh token')
    );

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await expect(
      act(async () => {
        await result.current.signIn('test@example.com', 'password');
      })
    ).rejects.toThrow('Sign in failed');

    expect(authStore.clear).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
  });

  it('should sign up successfully', async () => {
    (authApi.signUp as jest.Mock).mockResolvedValue(undefined);
    (authApi.refreshToken as jest.Mock).mockRejectedValue(
      new Error('No refresh token')
    );

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.signUp('test@example.com', 'password');
    });

    expect(authApi.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      passwordRaw: 'password',
    });
  });

  it('should logout successfully', async () => {
    (authApi.signOut as jest.Mock).mockResolvedValue(undefined);
    (authApi.refreshToken as jest.Mock).mockRejectedValue(
      new Error('No refresh token')
    );
    (authStore.getToken as jest.Mock).mockReturnValue('token');

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(authApi.signOut).toHaveBeenCalled();
    expect(authStore.clear).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(sessionStorage.getItem('wasAuthenticated')).toBeNull();
  });

  it('should refresh token on mount if wasAuthenticated is true', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    const mockResponse = {
      user: mockUser,
      accessToken: 'new-token',
    };

    sessionStorage.setItem('wasAuthenticated', 'true');
    (authApi.refreshToken as jest.Mock).mockResolvedValue(mockResponse);
    // Initially no token - getToken should return null so setToken gets called
    (authStore.getToken as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(authApi.refreshToken).toHaveBeenCalled();
    expect(authStore.setToken).toHaveBeenCalledWith('new-token');

    // After setToken is called, getToken should return the token
    (authStore.getToken as jest.Mock).mockReturnValue('new-token');

    // Wait for the state to update after token is set
    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  it('should update isAuthenticated when token changes', async () => {
    (authApi.refreshToken as jest.Mock).mockRejectedValue(
      new Error('No refresh token')
    );

    const { result, rerender } = renderHook(() => useAuthContext(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);

    (authStore.getToken as jest.Mock).mockReturnValue('token');

    // Trigger re-render to check token
    rerender();

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
});
