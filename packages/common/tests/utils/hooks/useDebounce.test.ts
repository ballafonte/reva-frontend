import { act, renderHook, waitFor } from '@testing-library/react';
import {
  DEFAULT_DELAY,
  useDebouncedCallback,
  useDebouncedValue,
} from '../../../src/utils/hooks/useDebounce';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return undefined initially', () => {
    const { result } = renderHook(() => useDebouncedValue('test'));
    expect(result.current).toBeUndefined();
  });

  it('should update value after delay', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value),
      {
        initialProps: { value: 'initial' },
      }
    );

    expect(result.current).toBeUndefined();

    act(() => {
      jest.advanceTimersByTime(DEFAULT_DELAY);
    });

    await waitFor(() => {
      expect(result.current).toBe('initial');
    });

    rerender({ value: 'updated' });

    act(() => {
      jest.advanceTimersByTime(DEFAULT_DELAY);
    });

    await waitFor(() => {
      expect(result.current).toBe('updated');
    });
  });

  it('should use custom delay', async () => {
    const customDelay = 1000;
    const { result } = renderHook(
      ({ value }) => useDebouncedValue(value, customDelay),
      {
        initialProps: { value: 'test' },
      }
    );

    act(() => {
      jest.advanceTimersByTime(customDelay - 100);
    });

    expect(result.current).toBeUndefined();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(result.current).toBe('test');
    });
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebouncedValue('test'));

    act(() => {
      jest.advanceTimersByTime(DEFAULT_DELAY - 100);
    });

    unmount();

    // Should not throw or cause issues
    act(() => {
      jest.advanceTimersByTime(200);
    });
  });
});

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce callback execution', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, DEFAULT_DELAY)
    );

    act(() => {
      result.current('arg1');
      result.current('arg2');
      result.current('arg3');
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(DEFAULT_DELAY);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg3');
  });

  it('should use custom delay', () => {
    const callback = jest.fn();
    const customDelay = 1000;
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, customDelay)
    );

    act(() => {
      result.current('test');
    });

    act(() => {
      jest.advanceTimersByTime(customDelay - 100);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple arguments', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, DEFAULT_DELAY)
    );

    act(() => {
      result.current('arg1', 'arg2', 'arg3');
    });

    act(() => {
      jest.advanceTimersByTime(DEFAULT_DELAY);
    });

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  it('should clear previous timeout on new call', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, DEFAULT_DELAY)
    );

    act(() => {
      result.current('first');
      jest.advanceTimersByTime(DEFAULT_DELAY - 100);
      result.current('second');
      jest.advanceTimersByTime(DEFAULT_DELAY);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('second');
  });
});
