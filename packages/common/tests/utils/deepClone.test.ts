import { deepClone } from '../../src/utils/deepClone';

describe('deepClone', () => {
  it('should clone a simple object', () => {
    const original = { a: 1, b: 2 };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should clone nested objects', () => {
    const original = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.b.d).not.toBe(original.b.d);
  });

  it('should clone arrays', () => {
    const original = [1, 2, 3];
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should clone arrays with nested objects', () => {
    const original = [
      { id: 1, name: 'test' },
      { id: 2, name: 'test2' },
    ];
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned[0]).not.toBe(original[0]);
    expect(cloned[1]).not.toBe(original[1]);
  });

  it('should handle null', () => {
    const original = null;
    const cloned = deepClone(original);

    expect(cloned).toBeNull();
  });

  it('should handle undefined', () => {
    // deepClone uses JSON.parse(JSON.stringify()), which can't handle undefined
    // JSON.stringify(undefined) returns undefined, not a string
    // So deepClone will throw an error for undefined
    expect(() => deepClone(undefined)).toThrow();
  });

  it('should handle primitives', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('string')).toBe('string');
    expect(deepClone(true)).toBe(true);
  });

  it('should create independent copies', () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = deepClone(original);

    cloned.a = 10;
    cloned.b.c = 20;

    expect(original.a).toBe(1);
    expect(original.b.c).toBe(2);
  });

  it('should handle empty objects', () => {
    const original = {};
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should handle empty arrays', () => {
    const original: unknown[] = [];
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });
});
