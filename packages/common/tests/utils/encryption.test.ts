import { decrypt, encrypt } from '@common/utils/encryption';

describe('encryption', () => {
  const password = 'test-password-123';
  const message = 'Hello, World!';

  it('should encrypt and decrypt a message correctly', () => {
    const encrypted = encrypt(message, password);
    const decrypted = decrypt(encrypted, password);

    expect(decrypted).toBe(message);
    expect(encrypted).not.toBe(message);
  });

  it('should produce different encrypted output for same message', () => {
    const encrypted1 = encrypt(message, password);
    const encrypted2 = encrypt(message, password);

    // Should be different due to random salt and IV
    expect(encrypted1).not.toBe(encrypted2);

    // But both should decrypt to the same message
    expect(decrypt(encrypted1, password)).toBe(message);
    expect(decrypt(encrypted2, password)).toBe(message);
  });

  it('should handle empty string', () => {
    const encrypted = encrypt('', password);
    const decrypted = decrypt(encrypted, password);

    expect(decrypted).toBe('');
  });

  it('should handle special characters', () => {
    const specialMessage = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const encrypted = encrypt(specialMessage, password);
    const decrypted = decrypt(encrypted, password);

    expect(decrypted).toBe(specialMessage);
  });

  it('should handle unicode characters', () => {
    const unicodeMessage = 'Hello 世界 🌍';
    const encrypted = encrypt(unicodeMessage, password);
    const decrypted = decrypt(encrypted, password);

    expect(decrypted).toBe(unicodeMessage);
  });

  it('should handle long messages', () => {
    const longMessage = 'a'.repeat(1000);
    const encrypted = encrypt(longMessage, password);
    const decrypted = decrypt(encrypted, password);

    expect(decrypted).toBe(longMessage);
  });

  it('should handle different passwords', () => {
    const password1 = 'password1';
    const password2 = 'password2';

    const encrypted = encrypt(message, password1);
    const decrypted1 = decrypt(encrypted, password1);
    const decrypted2 = decrypt(encrypted, password2);

    expect(decrypted1).toBe(message);
    expect(decrypted2).not.toBe(message);
  });

  it('should handle multiline text', () => {
    const multilineMessage = 'Line 1\nLine 2\nLine 3';
    const encrypted = encrypt(multilineMessage, password);
    const decrypted = decrypt(encrypted, password);

    expect(decrypted).toBe(multilineMessage);
  });

  it('should handle JSON-like strings', () => {
    const jsonMessage = '{"key": "value", "number": 123}';
    const encrypted = encrypt(jsonMessage, password);
    const decrypted = decrypt(encrypted, password);

    expect(decrypted).toBe(jsonMessage);
  });
});
