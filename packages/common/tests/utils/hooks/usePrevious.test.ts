import { renderHook } from '@testing-library/react';
import { usePrevious } from '../../../src/utils/hooks/usePrevious';

describe('usePrevious', () => {
  it('should return undefined initially', () => {
    const { result } = renderHook(() => usePrevious('initial'));

    expect(result.current).toBeUndefined();
  });

  it('should return previous value after update', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 'updated' });

    expect(result.current).toBe('initial');
  });

  it('should track multiple value changes', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    });

    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    rerender({ value: 'third' });
    expect(result.current).toBe('second');
  });

  it('should handle number values', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });

  it('should handle object values', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: obj1 },
    });

    rerender({ value: obj2 });
    expect(result.current).toBe(obj1);
  });

  it('should handle null values', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string | null }) =>
        usePrevious<string | null>(value),
      {
        initialProps: { value: null },
      }
    );

    // @ts-expect-error - TypeScript incorrectly infers type here due to union type
    rerender({ value: 'not null' });
    // TypeScript can't properly narrow the union type, so we use toEqual
    expect(result.current).toEqual(null);
  });

  it('should handle undefined values', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string | undefined }) =>
        usePrevious<string | undefined>(value),
      {
        initialProps: { value: undefined },
      }
    );

    // @ts-expect-error - TypeScript incorrectly infers type here due to union type
    rerender({ value: 'defined' });
    // TypeScript can't properly narrow the union type, so we use toEqual
    expect(result.current).toEqual(undefined);
  });
});
