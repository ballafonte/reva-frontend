import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { AlertsProvider } from '../../../../src/utils/contexts/AlertsContext/AlertsProvider';
import { useAlertsContext } from '../../../../src/utils/contexts/AlertsContext/AlertsContext';
import { SeverityContexts } from '../../../../src/theme/theme.types';

// Mock printConsole - path from test file location to console module
jest.mock('../../../../src/utils/console', () => ({
  ...jest.requireActual('../../../../src/utils/console'),
  printConsole: jest.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AlertsProvider>{children}</AlertsProvider>
);

describe('AlertsContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should provide alerts context', () => {
    const { result } = renderHook(() => useAlertsContext(), { wrapper });

    expect(result.current).toHaveProperty('alerts');
    expect(result.current).toHaveProperty('pushAlert');
    expect(result.current).toHaveProperty('dismissAlert');
    expect(result.current.alerts).toEqual([]);
  });

  it('should push alert with message', () => {
    const { result } = renderHook(() => useAlertsContext(), { wrapper });

    act(() => {
      result.current.pushAlert({
        message: 'Test alert',
        severity: SeverityContexts.INFO,
      });
    });

    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0].message).toBe('Test alert');
    expect(result.current.alerts[0].severity).toBe(SeverityContexts.INFO);
    expect(result.current.alerts[0].id).toBeDefined();
    expect(result.current.alerts[0].createdAt).toBeInstanceOf(Date);
  });

  it('should not push alert without message', () => {
    const { printConsole } = jest.requireMock('../../../../src/utils/console');
    const { result } = renderHook(() => useAlertsContext(), { wrapper });

    act(() => {
      result.current.pushAlert({
        severity: SeverityContexts.DANGER,
      });
    });

    expect(result.current.alerts).toHaveLength(0);
    expect(printConsole).toHaveBeenCalledWith(
      'error',
      'No message provided for alert'
    );
  });

  it('should dismiss alert by id', () => {
    const { result } = renderHook(() => useAlertsContext(), { wrapper });

    act(() => {
      result.current.pushAlert({ message: 'Alert 1' });
      result.current.pushAlert({ message: 'Alert 2' });
    });

    expect(result.current.alerts).toHaveLength(2);

    const alertId = result.current.alerts[0].id;

    act(() => {
      result.current.dismissAlert(alertId);
    });

    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0].message).toBe('Alert 2');
  });

  it('should handle multiple alerts', () => {
    const { result } = renderHook(() => useAlertsContext(), { wrapper });

    act(() => {
      result.current.pushAlert({ message: 'Alert 1' });
      result.current.pushAlert({ message: 'Alert 2' });
      result.current.pushAlert({ message: 'Alert 3' });
    });

    expect(result.current.alerts).toHaveLength(3);
  });

  it('should auto-dismiss alerts after timeout', async () => {
    const { result } = renderHook(() => useAlertsContext(), {
      wrapper: ({ children }) => (
        <AlertsProvider alertTimeout={1000}>{children}</AlertsProvider>
      ),
    });

    act(() => {
      result.current.pushAlert({ message: 'Test alert' });
    });

    expect(result.current.alerts).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.alerts).toHaveLength(0);
    });
  });

  it('should use custom alert timeout', async () => {
    const customTimeout = 2000;
    const { result } = renderHook(() => useAlertsContext(), {
      wrapper: ({ children }) => (
        <AlertsProvider alertTimeout={customTimeout}>{children}</AlertsProvider>
      ),
    });

    act(() => {
      result.current.pushAlert({ message: 'Test alert' });
    });

    act(() => {
      jest.advanceTimersByTime(customTimeout - 100);
    });

    expect(result.current.alerts).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(result.current.alerts).toHaveLength(0);
    });
  });

  it('should format alert with default values', () => {
    const { result } = renderHook(() => useAlertsContext(), { wrapper });

    act(() => {
      result.current.pushAlert({ message: 'Test' });
    });

    const alert = result.current.alerts[0];
    expect(alert.id).toBeDefined();
    expect(alert.severity).toBe(SeverityContexts.INFO);
    expect(alert.createdAt).toBeInstanceOf(Date);
  });

  it('should handle custom alert properties', () => {
    const { result } = renderHook(() => useAlertsContext(), { wrapper });
    const customId = 'custom-id';
    const customDate = new Date('2023-01-01');

    act(() => {
      result.current.pushAlert({
        id: customId,
        message: 'Custom alert',
        severity: SeverityContexts.DANGER,
        createdAt: customDate,
      });
    });

    const alert = result.current.alerts[0];
    expect(alert.id).toBe(customId);
    expect(alert.severity).toBe(SeverityContexts.DANGER);
    expect(alert.createdAt).toBe(customDate);
  });
});
