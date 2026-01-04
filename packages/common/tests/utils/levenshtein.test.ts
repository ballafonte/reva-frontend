import {
  getLevenshteinDistance,
  sortByFirstCharAndLevenshteinDistance,
  sortByLevenshteinDistance,
} from '@common/utils/levenshtein';

describe('getLevenshteinDistance', () => {
  it('should return 0 for identical strings', () => {
    expect(getLevenshteinDistance('test', 'test')).toBe(0);
  });

  it('should return the length of the second string when first is empty', () => {
    expect(getLevenshteinDistance('', 'test')).toBe(4);
  });

  it('should return the length of the first string when second is empty', () => {
    expect(getLevenshteinDistance('test', '')).toBe(4);
  });

  it('should calculate distance for single character difference', () => {
    expect(getLevenshteinDistance('test', 'best')).toBe(1);
  });

  it('should calculate distance for multiple character differences', () => {
    expect(getLevenshteinDistance('kitten', 'sitting')).toBe(3);
  });

  it('should handle case differences', () => {
    expect(getLevenshteinDistance('Test', 'test')).toBe(1);
  });

  it('should handle special characters', () => {
    expect(getLevenshteinDistance('hello!', 'hello')).toBe(1);
  });
});

describe('sortByLevenshteinDistance', () => {
  it('should sort by distance to search text', () => {
    const items = ['apple', 'banana', 'apricot'];
    const sorted = [...items].sort((a, b) =>
      sortByLevenshteinDistance('apple', a, b)
    );

    expect(sorted[0]).toBe('apple');
  });

  it('should handle undefined values', () => {
    const items = ['apple', undefined, 'banana'];
    const sorted = [...items].sort((a, b) =>
      sortByLevenshteinDistance('apple', a, b)
    );

    expect(sorted[0]).toBe('apple');
  });

  it('should be case insensitive', () => {
    const items = ['Apple', 'banana', 'APRICOT'];
    const sorted = [...items].sort((a, b) =>
      sortByLevenshteinDistance('apple', a, b)
    );

    expect(sorted[0]).toBe('Apple');
  });

  it('should handle empty search text', () => {
    const items = ['apple', 'banana'];
    const sorted = [...items].sort((a, b) =>
      sortByLevenshteinDistance('', a, b)
    );

    expect(sorted.length).toBe(2);
  });
});

describe('sortByFirstCharAndLevenshteinDistance', () => {
  it('should prioritize items starting with search text first character', () => {
    const items = ['banana', 'apple', 'apricot'];
    const sorted = [...items].sort((a, b) =>
      sortByFirstCharAndLevenshteinDistance('apple', a, b)
    );

    expect(sorted[0]).toBe('apple');
    expect(sorted[1]).toBe('apricot');
  });

  it('should return 0 for identical strings', () => {
    expect(sortByFirstCharAndLevenshteinDistance('test', 'test', 'test')).toBe(
      0
    );
  });

  it('should use levenshtein distance when first chars match', () => {
    const items = ['apricot', 'apple'];
    const sorted = [...items].sort((a, b) =>
      sortByFirstCharAndLevenshteinDistance('apple', a, b)
    );

    expect(sorted[0]).toBe('apple');
  });

  it('should be case insensitive', () => {
    const items = ['Banana', 'Apple'];
    const sorted = [...items].sort((a, b) =>
      sortByFirstCharAndLevenshteinDistance('apple', a, b)
    );

    expect(sorted[0]).toBe('Apple');
  });

  it('should handle items that do not start with search first char', () => {
    const items = ['banana', 'cherry', 'apple'];
    const sorted = [...items].sort((a, b) =>
      sortByFirstCharAndLevenshteinDistance('apple', a, b)
    );

    expect(sorted[0]).toBe('apple');
  });
});
