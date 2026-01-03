import { isNullish } from '@common/utils/typeGuards';

describe('isNullish', () => {
  it('should return true for null', () => {
    expect(isNullish(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isNullish(undefined)).toBe(true);
  });

  it('should return false for 0', () => {
    expect(isNullish(0)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isNullish('')).toBe(false);
  });

  it('should return false for false', () => {
    expect(isNullish(false)).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(isNullish(NaN)).toBe(false);
  });

  it('should return false for objects', () => {
    expect(isNullish({})).toBe(false);
    expect(isNullish([])).toBe(false);
  });

  it('should return false for numbers', () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish(42)).toBe(false);
    expect(isNullish(-1)).toBe(false);
  });

  it('should return false for strings', () => {
    expect(isNullish('')).toBe(false);
    expect(isNullish('test')).toBe(false);
  });

  it('should return false for booleans', () => {
    expect(isNullish(true)).toBe(false);
    expect(isNullish(false)).toBe(false);
  });
});

