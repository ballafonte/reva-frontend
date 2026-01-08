import { act, renderHook } from '@testing-library/react';
import { usePagination } from '../../../src/utils/hooks/usePagination';

describe('usePagination', () => {
  it('should throw error for itemsPerPage less than 1', () => {
    expect(() => {
      renderHook(() => usePagination([1, 2, 3], 0));
    }).toThrow('itemsPerPage must be greater than 0');
  });

  it('should initialize with first page for non-empty items', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.maxPage).toBe(3);
    expect(result.current.currentItems).toEqual([1, 2]);
  });

  it('should initialize with page 0 for empty items', () => {
    const { result } = renderHook(() => usePagination([], 2));

    expect(result.current.currentPage).toBe(0);
    expect(result.current.maxPage).toBe(0);
    expect(result.current.currentItems).toEqual([]);
  });

  it('should calculate maxPage correctly', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    expect(result.current.maxPage).toBe(3);
  });

  it('should return correct items for current page', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    expect(result.current.currentItems).toEqual([1, 2]);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentItems).toEqual([3, 4]);
  });

  it('should navigate to next page', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual([3, 4]);
  });

  it('should not go beyond maxPage', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => {
      result.current.nextPage();
      result.current.nextPage();
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.isLastPage).toBe(true);
  });

  it('should navigate to previous page', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => {
      result.current.nextPage();
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should not go below page 1', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.isFirstPage).toBe(true);
  });

  it('should navigate to first page', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => {
      result.current.nextPage();
      result.current.nextPage();
      result.current.firstPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.isFirstPage).toBe(true);
  });

  it('should navigate to last page', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => {
      result.current.lastPage();
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.isLastPage).toBe(true);
  });

  it('should reset to page 1 when items change', () => {
    const { result, rerender } = renderHook(
      ({ items }) => usePagination(items, 2),
      {
        initialProps: { items: [1, 2, 3, 4, 5] },
      }
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);

    rerender({ items: [1, 2, 3] });

    expect(result.current.currentPage).toBe(1);
  });

  it('should reset to page 0 when items become empty', () => {
    const { result, rerender } = renderHook(
      ({ items }) => usePagination(items, 2),
      {
        initialProps: { items: [1, 2, 3] },
      }
    );

    rerender({ items: [] });

    expect(result.current.currentPage).toBe(0);
  });

  it('should correctly identify first and last page', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);

    act(() => {
      result.current.lastPage();
    });

    expect(result.current.isFirstPage).toBe(false);
    expect(result.current.isLastPage).toBe(true);
  });
});
