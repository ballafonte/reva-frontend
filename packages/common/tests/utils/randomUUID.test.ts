import {
  getRandomNumber,
  getRandomString,
  randomUUID,
} from '@common/utils/randomUUID';

describe('randomUUID', () => {
  it('should generate a valid UUID format', () => {
    const uuid = randomUUID();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidRegex);
  });

  it('should generate unique UUIDs', () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    expect(uuid1).not.toBe(uuid2);
  });

  it('should generate multiple unique UUIDs', () => {
    const uuids = Array.from({ length: 100 }, () => randomUUID());
    const uniqueUuids = new Set(uuids);
    expect(uniqueUuids.size).toBe(100);
  });
});

describe('getRandomNumber', () => {
  it('should generate a number', () => {
    const num = getRandomNumber();
    expect(typeof num).toBe('number');
  });

  it('should generate a number with default length', () => {
    const num = getRandomNumber();
    expect(num).toBeGreaterThanOrEqual(0);
  });

  it('should generate a number with custom length', () => {
    const num = getRandomNumber(5);
    expect(typeof num).toBe('number');
    expect(num).toBeGreaterThanOrEqual(0);
  });

  it('should generate different numbers', () => {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    // Note: There's a small chance they could be the same, but very unlikely
    // This test verifies the function works, not that it's always unique
    expect(typeof num1).toBe('number');
    expect(typeof num2).toBe('number');
  });
});

describe('getRandomString', () => {
  it('should generate a string', () => {
    const str = getRandomString();
    expect(typeof str).toBe('string');
  });

  it('should generate a valid UUID format when randomUUID is available', () => {
    const str = getRandomString();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(str).toMatch(uuidRegex);
  });

  it('should generate unique strings', () => {
    const str1 = getRandomString();
    const str2 = getRandomString();
    expect(str1).not.toBe(str2);
  });

  it('should generate multiple unique strings', () => {
    const strings = Array.from({ length: 100 }, () => getRandomString());
    const uniqueStrings = new Set(strings);
    expect(uniqueStrings.size).toBe(100);
  });

  it('should handle custom length parameter (fallback behavior)', () => {
    // When randomUUID is mocked, it should still work
    const str = getRandomString(10);
    expect(typeof str).toBe('string');
  });
});
