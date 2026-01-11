import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useRevokeAllOtherSessionsMutation,
  useRevokeSessionMutation,
  useRevokeUserSessionsMutation,
} from '../../../src/utils/mutations/users.mutations';
import * as usersApi from '../../../src/api/users.api';

// Mock the API functions
jest.mock('../../../src/api/users.api', () => ({
  revokeAllOtherSessions: jest.fn(),
  revokeSession: jest.fn(),
  revokeUserSessions: jest.fn(),
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

  return { Wrapper, queryClient };
};

describe('users.mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useRevokeAllOtherSessionsMutation', () => {
    it('should call the mutation function correctly', async () => {
      (usersApi.revokeAllOtherSessions as jest.Mock).mockResolvedValue(
        undefined
      );

      const { Wrapper, queryClient } = createWrapper();
      const { result } = renderHook(
        () => useRevokeAllOtherSessionsMutation(),
        {
          wrapper: Wrapper,
        }
      );

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(usersApi.revokeAllOtherSessions).toHaveBeenCalledTimes(1);
    });

    it('should invalidate userSessions query on success', async () => {
      (usersApi.revokeAllOtherSessions as jest.Mock).mockResolvedValue(
        undefined
      );

      const { Wrapper, queryClient } = createWrapper();

      // Pre-populate the cache
      queryClient.setQueryData(['userSessions'], []);

      const { result } = renderHook(
        () => useRevokeAllOtherSessionsMutation(),
        {
          wrapper: Wrapper,
        }
      );

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Check that the query was invalidated
      const queryState = queryClient.getQueryState(['userSessions']);
      expect(queryState?.isInvalidated).toBe(true);
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Failed to revoke sessions';
      (usersApi.revokeAllOtherSessions as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const { Wrapper } = createWrapper();
      const { result } = renderHook(
        () => useRevokeAllOtherSessionsMutation(),
        {
          wrapper: Wrapper,
        }
      );

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(errorMessage);
    });
  });

  describe('useRevokeSessionMutation', () => {
    const sessionId = 'session-123';

    it('should call the mutation function with sessionId correctly', async () => {
      (usersApi.revokeSession as jest.Mock).mockResolvedValue(undefined);

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useRevokeSessionMutation(), {
        wrapper: Wrapper,
      });

      result.current.mutate({ sessionId });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(usersApi.revokeSession).toHaveBeenCalledWith({ sessionId });
    });

    it('should invalidate userSessions query on success', async () => {
      (usersApi.revokeSession as jest.Mock).mockResolvedValue(undefined);

      const { Wrapper, queryClient } = createWrapper();

      // Pre-populate the cache
      queryClient.setQueryData(['userSessions'], []);

      const { result } = renderHook(() => useRevokeSessionMutation(), {
        wrapper: Wrapper,
      });

      result.current.mutate({ sessionId });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Check that the query was invalidated
      const queryState = queryClient.getQueryState(['userSessions']);
      expect(queryState?.isInvalidated).toBe(true);
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Failed to revoke session';
      (usersApi.revokeSession as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useRevokeSessionMutation(), {
        wrapper: Wrapper,
      });

      result.current.mutate({ sessionId });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(errorMessage);
    });
  });

  describe('useRevokeUserSessionsMutation', () => {
    const userId = 'user-123';

    it('should call the mutation function with userId correctly', async () => {
      (usersApi.revokeUserSessions as jest.Mock).mockResolvedValue(undefined);

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useRevokeUserSessionsMutation(), {
        wrapper: Wrapper,
      });

      result.current.mutate({ userId });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(usersApi.revokeUserSessions).toHaveBeenCalledWith({ userId });
    });

    it('should invalidate relevant queries on success', async () => {
      (usersApi.revokeUserSessions as jest.Mock).mockResolvedValue(undefined);

      const { Wrapper, queryClient } = createWrapper();

      // Pre-populate the cache
      queryClient.setQueryData(['userSessions'], []);
      queryClient.setQueryData(['user', userId], {});

      const { result } = renderHook(() => useRevokeUserSessionsMutation(), {
        wrapper: Wrapper,
      });

      result.current.mutate({ userId });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Check that both queries were invalidated
      const userSessionsState = queryClient.getQueryState(['userSessions']);
      const userState = queryClient.getQueryState(['user', userId]);
      expect(userSessionsState?.isInvalidated).toBe(true);
      expect(userState?.isInvalidated).toBe(true);
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Failed to revoke user sessions';
      (usersApi.revokeUserSessions as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useRevokeUserSessionsMutation(), {
        wrapper: Wrapper,
      });

      result.current.mutate({ userId });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(errorMessage);
    });
  });
});
