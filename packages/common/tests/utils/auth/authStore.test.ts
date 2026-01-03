import { authStore } from '@common/utils/auth/authStore';

describe('authStore', () => {
  beforeEach(() => {
    authStore.clear();
  });

  it('should return null when no token is set', () => {
    expect(authStore.getToken()).toBeNull();
  });

  it('should store and retrieve token', () => {
    const token = 'test-token-123';
    authStore.setToken(token);
    expect(authStore.getToken()).toBe(token);
  });

  it('should update token when set multiple times', () => {
    authStore.setToken('first-token');
    expect(authStore.getToken()).toBe('first-token');

    authStore.setToken('second-token');
    expect(authStore.getToken()).toBe('second-token');
  });

  it('should clear token', () => {
    authStore.setToken('test-token');
    expect(authStore.getToken()).toBe('test-token');

    authStore.clear();
    expect(authStore.getToken()).toBeNull();
  });

  it('should store token in memory only', () => {
    // Verify that token is not in localStorage
    expect(localStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('token')).toBeNull();

    authStore.setToken('test-token');
    expect(authStore.getToken()).toBe('test-token');

    // Still not in storage
    expect(localStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('token')).toBeNull();
  });

  it('should handle empty string token', () => {
    authStore.setToken('');
    expect(authStore.getToken()).toBe('');
  });

  it('should handle long token strings', () => {
    const longToken = 'a'.repeat(1000);
    authStore.setToken(longToken);
    expect(authStore.getToken()).toBe(longToken);
  });
});

