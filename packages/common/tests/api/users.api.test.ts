import {
  getUsers,
  getUserSessions,
  revokeAllOtherSessions,
  revokeSession,
  revokeUserSessions,
} from '../../src/api/users.api';
import * as apiUtils from '../../src/api/api.utils';
import { mockUsers } from '../mockData/users';
import { mockSessions } from '../mockData/sessions';

// Mock api.utils
jest.mock('../../src/api/api.utils', () => ({
  callApi: jest.fn(),
  getApiBaseUrl: jest.fn(() => '/'),
}));

describe('users.api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should call the correct endpoint with GET method', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(mockUsers);

      await getUsers();

      expect(apiUtils.callApi).toHaveBeenCalledWith(
        '/users',
        {
          method: 'GET',
        },
        undefined,
        expect.any(Function)
      );
    });

    it('should return an array of users', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(mockUsers);

      const result = await getUsers();

      expect(result).toEqual(mockUsers);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Failed to fetch users';
      (apiUtils.callApi as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(getUsers()).rejects.toThrow(errorMessage);
    });
  });

  describe('getUserSessions', () => {
    it('should call the correct endpoint with GET method', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(mockSessions);

      await getUserSessions();

      expect(apiUtils.callApi).toHaveBeenCalledWith(
        '/users/sessions',
        {
          method: 'GET',
        },
        undefined,
        expect.any(Function)
      );
    });

    it('should return an array of sessions', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(mockSessions);

      const result = await getUserSessions();

      expect(result).toEqual(mockSessions);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Failed to fetch sessions';
      (apiUtils.callApi as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(getUserSessions()).rejects.toThrow(errorMessage);
    });
  });

  describe('revokeAllOtherSessions', () => {
    it('should call the correct endpoint with DELETE method', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(undefined);

      await revokeAllOtherSessions();

      expect(apiUtils.callApi).toHaveBeenCalledWith(
        '/users/sessions',
        {
          method: 'DELETE',
        },
        undefined,
        expect.any(Function)
      );
    });

    it('should return void on success', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(undefined);

      const result = await revokeAllOtherSessions();

      expect(result).toBeUndefined();
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Failed to revoke sessions';
      (apiUtils.callApi as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(revokeAllOtherSessions()).rejects.toThrow(errorMessage);
    });
  });

  describe('revokeSession', () => {
    const sessionId = 'session-123';

    it('should call the correct endpoint with DELETE method and sessionId in path', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(undefined);

      await revokeSession({ sessionId });

      expect(apiUtils.callApi).toHaveBeenCalledWith(
        `/users/sessions/${sessionId}`,
        {
          method: 'DELETE',
        },
        undefined,
        expect.any(Function)
      );
    });

    it('should return void on success', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(undefined);

      const result = await revokeSession({ sessionId });

      expect(result).toBeUndefined();
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Failed to revoke session';
      (apiUtils.callApi as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(revokeSession({ sessionId })).rejects.toThrow(errorMessage);
    });
  });

  describe('revokeUserSessions', () => {
    const userId = 'user-123';

    it('should call the correct endpoint with DELETE method and userId in path', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(undefined);

      await revokeUserSessions({ userId });

      expect(apiUtils.callApi).toHaveBeenCalledWith(
        `/users/${userId}/sessions`,
        {
          method: 'DELETE',
        },
        undefined,
        expect.any(Function)
      );
    });

    it('should return void on success', async () => {
      (apiUtils.callApi as jest.Mock).mockResolvedValue(undefined);

      const result = await revokeUserSessions({ userId });

      expect(result).toBeUndefined();
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Failed to revoke user sessions';
      (apiUtils.callApi as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(revokeUserSessions({ userId })).rejects.toThrow(
        errorMessage
      );
    });
  });
});
