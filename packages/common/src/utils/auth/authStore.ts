/**
 * In-memory authentication token store
 * 
 * Access tokens are stored in memory only (not localStorage) for security.
 * This prevents XSS attacks from stealing tokens.
 */

let accessToken: string | null = null;

export const authStore = {
  /**
   * Get the current access token
   * @returns The access token or null if not set
   */
  getToken(): string | null {
    return accessToken;
  },

  /**
   * Set the access token
   * @param token The access token to store
   */
  setToken(token: string) {
    accessToken = token;
  },

  /**
   * Clear the access token from memory
   */
  clear() {
    accessToken = null;
  },
};

