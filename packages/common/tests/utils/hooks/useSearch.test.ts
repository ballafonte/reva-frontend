import { renderHook } from '@testing-library/react';
import { useSearch } from '@common/utils/hooks/useSearch';

describe('useSearch', () => {
  const items = [
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Banana', category: 'Fruit' },
    { id: 3, name: 'Carrot', category: 'Vegetable' },
    { id: 4, name: 'Apricot', category: 'Fruit' },
  ];

  it('should return all items when searchText is empty', () => {
    const { result } = renderHook(() =>
      useSearch(items, ['name'], undefined)
    );

    expect(result.current).toEqual(items);
  });

  it('should return all items when searchText is not provided', () => {
    const { result } = renderHook(() => useSearch(items, ['name']));

    expect(result.current).toEqual(items);
  });

  it('should filter items by search text', () => {
    const { result } = renderHook(() =>
      useSearch(items, ['name'], 'Apple')
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Apple');
  });

  it('should search across multiple keys', () => {
    const { result } = renderHook(() =>
      useSearch(items, ['name', 'category'], 'Fruit')
    );

    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current.every((item) => item.category === 'Fruit')).toBe(
      true
    );
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() =>
      useSearch(items, ['name'], 'XYZ123')
    );

    expect(result.current).toEqual([]);
  });

  it('should handle case-insensitive search', () => {
    const { result } = renderHook(() =>
      useSearch(items, ['name'], 'apple')
    );

    expect(result.current.length).toBeGreaterThan(0);
  });

  it('should handle empty items array', () => {
    const { result } = renderHook(() =>
      useSearch([], ['name'], 'test')
    );

    expect(result.current).toEqual([]);
  });

  it('should prioritize items starting with search text', () => {
    const { result } = renderHook(() =>
      useSearch(items, ['name'], 'Ap')
    );

    // Should prioritize items starting with 'Ap'
    expect(result.current.length).toBeGreaterThan(0);
    const firstResult = result.current[0];
    expect(firstResult.name.toLowerCase().startsWith('ap')).toBe(true);
  });

  it('should handle items with missing keys', () => {
    const itemsWithMissing = [
      { id: 1, name: 'Apple' },
      { id: 2 }, // missing name
      { id: 3, name: 'Banana' },
    ];

    const { result } = renderHook(() =>
      useSearch(itemsWithMissing, ['name'], 'Apple')
    );

    expect(result.current.length).toBeGreaterThanOrEqual(1);
  });
});

