import { renderHook } from '@testing-library/react';
import { useUserStatus } from '@/utils/hooks/useUserStatus';

describe('useUserStatus', () => {
  it('should return success color and "Active" label for ACTIVE status', () => {
    const { result } = renderHook(() => useUserStatus('ACTIVE'));

    expect(result.current.color).toBe('success');
    expect(result.current.label).toBe('Active');
  });

  it('should return default color and "Inactive" label for INACTIVE status', () => {
    const { result } = renderHook(() => useUserStatus('INACTIVE'));

    expect(result.current.color).toBe('default');
    expect(result.current.label).toBe('Inactive');
  });

  it('should return warning color and "Pending" label for PENDING status', () => {
    const { result } = renderHook(() => useUserStatus('PENDING'));

    expect(result.current.color).toBe('warning');
    expect(result.current.label).toBe('Pending');
  });

  it('should return default color and "Suspended" label for SUSPENDED status', () => {
    const { result } = renderHook(() => useUserStatus('SUSPENDED'));

    expect(result.current.color).toBe('default');
    expect(result.current.label).toBe('Suspended');
  });

  it('should return default color and "Deleted" label for DELETED status', () => {
    const { result } = renderHook(() => useUserStatus('DELETED'));

    expect(result.current.color).toBe('default');
    expect(result.current.label).toBe('Deleted');
  });

  it('should handle lowercase status strings', () => {
    const { result } = renderHook(() => useUserStatus('active'));

    expect(result.current.color).toBe('success');
    expect(result.current.label).toBe('Active');
  });

  it('should return default color and "Unknown" label for undefined status', () => {
    const { result } = renderHook(() => useUserStatus(undefined));

    expect(result.current.color).toBe('default');
    expect(result.current.label).toBe('Unknown');
  });

  it('should return default color and "Unknown" label for null status', () => {
    const { result } = renderHook(() => useUserStatus(null));

    expect(result.current.color).toBe('default');
    expect(result.current.label).toBe('Unknown');
  });

  it('should return default color and "Unknown" label for unknown status', () => {
    const { result } = renderHook(() => useUserStatus('UNKNOWN_STATUS'));

    expect(result.current.color).toBe('default');
    expect(result.current.label).toBe('Unknown');
  });

  it('should memoize the result based on status', () => {
    const { result, rerender } = renderHook(
      ({ status }) => useUserStatus(status),
      {
        initialProps: { status: 'ACTIVE' },
      }
    );

    const firstResult = result.current;

    rerender({ status: 'ACTIVE' });
    expect(result.current).toBe(firstResult);

    rerender({ status: 'INACTIVE' });
    expect(result.current).not.toBe(firstResult);
    expect(result.current.color).toBe('default');
    expect(result.current.label).toBe('Inactive');
  });
});
