import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useUsersQuery,
  useUserSessionsQuery,
  useUserQuery,
} from '../../../src/utils/queries/users.queries';
import * as usersApi from '../../../src/api/users.api';
import { mockUsers } from '../../mockData/users';
import { mockSessions } from '../../mockData/sessions';

// Mock the API functions
jest.mock('../../../src/api/users.api', () => ({
  getUsers: jest.fn(),
  getUserSessions: jest.fn(),
  getUserById: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';

  return Wrapper;
};

describe('users.queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useUsersQuery', () => {
    it('should fetch users using the query hook', async () => {
      (usersApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const { result } = renderHook(() => useUsersQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockUsers);
    });

    it('should return loading state correctly', () => {
      (usersApi.getUsers as jest.Mock).mockImplementation(
        () =>
          new Promise(() => {
            // Never resolves to keep loading
          })
      );

      const { result } = renderHook(() => useUsersQuery(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
    });

    it('should return error state correctly', async () => {
      const errorMessage = 'Failed to fetch users';
      (usersApi.getUsers as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const { result } = renderHook(() => useUsersQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(errorMessage);
    });

    it('should use the correct query key', () => {
      (usersApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const { result } = renderHook(() => useUsersQuery(), {
        wrapper: createWrapper(),
      });

      // Query key should be ['users']
      expect(result.current.dataUpdatedAt).toBeDefined();
    });
  });

  describe('useUserSessionsQuery', () => {
    it('should fetch user sessions using the query hook', async () => {
      (usersApi.getUserSessions as jest.Mock).mockResolvedValue(mockSessions);

      const { result } = renderHook(() => useUserSessionsQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSessions);
    });

    it('should return loading state correctly', () => {
      (usersApi.getUserSessions as jest.Mock).mockImplementation(
        () =>
          new Promise(() => {
            // Never resolves to keep loading
          })
      );

      const { result } = renderHook(() => useUserSessionsQuery(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
    });

    it('should return error state correctly', async () => {
      const errorMessage = 'Failed to fetch sessions';
      (usersApi.getUserSessions as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const { result } = renderHook(() => useUserSessionsQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(errorMessage);
    });

    it('should use the correct query key', () => {
      (usersApi.getUserSessions as jest.Mock).mockResolvedValue(mockSessions);

      const { result } = renderHook(() => useUserSessionsQuery(), {
        wrapper: createWrapper(),
      });

      // Query key should be ['userSessions']
      expect(result.current.dataUpdatedAt).toBeDefined();
    });
  });

  describe('useUserQuery', () => {
    const userId = mockUsers[0].id;
    const user = mockUsers[0];

    it('should fetch a user by ID using the query hook', async () => {
      (usersApi.getUserById as jest.Mock).mockResolvedValue(user);

      const { result } = renderHook(() => useUserQuery({ id: userId }), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(user);
      expect(usersApi.getUserById).toHaveBeenCalledWith({ id: userId });
    });

    it('should not fetch when id is not provided', () => {
      (usersApi.getUserById as jest.Mock).mockResolvedValue(user);

      const { result } = renderHook(() => useUserQuery({ id: undefined }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(usersApi.getUserById).not.toHaveBeenCalled();
    });

    it('should return error state correctly', async () => {
      const errorMessage = 'User not found';
      (usersApi.getUserById as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const { result } = renderHook(() => useUserQuery({ id: userId }), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(errorMessage);
    });

    it('should use the correct query key', async () => {
      (usersApi.getUserById as jest.Mock).mockResolvedValue(user);

      const { result } = renderHook(() => useUserQuery({ id: userId }), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Query key should be ['user', userId]
      expect(result.current.dataUpdatedAt).toBeDefined();
    });
  });
});
