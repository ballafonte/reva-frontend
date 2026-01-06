import React, { useCallback, useEffect, useState } from 'react';
import type { Alert } from './AlertsContext';
import { printConsole } from '@common/utils';
import { AlertsContext } from './AlertsContext';
import { formatAlert, DEFAULT_ALERTS_TIMEOUT } from './AlertsContext.utils';

export interface AlertsProviderProps {
  alertTimeout?: number;
  children: React.ReactNode;
}

export const AlertsProvider: React.FC<AlertsProviderProps> = ({
  alertTimeout = DEFAULT_ALERTS_TIMEOUT,
  children,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [shiftInterval, setShiftInterval] = useState<number>();

  /**
   * Pushes a new alert notification to the alerts array to be displayed at the top of the screen
   */
  const pushAlert = (newAlert: Partial<Alert>) => {
    if (newAlert.message) {
      const formattedAlert = formatAlert(newAlert);
      setAlerts((current) => [...current, formattedAlert]);
    } else {
      printConsole('error', 'No message provided for alert');
    }
  };

  /**
   * Dismisses an alert notification from the alerts array but does not remove it from the notifications array
   */
  const dismissAlert = (alertId: Alert['id']) => {
    const newList = alerts.filter((a) => a.id !== alertId);
    setAlerts(newList);
  };

  const shiftAlerts = useCallback(() => {
    alerts.shift();
    setAlerts([...alerts]);
  }, [alerts]);

  const clearAlerts = () => {
    setAlerts([]);
  };

  // Shift the alerts array once every few seconds
  useEffect(() => {
    clearInterval(shiftInterval);
    if (alerts.length) {
      const newInterval = window.setInterval(shiftAlerts, alertTimeout);
      setShiftInterval(newInterval);
    }
    return () => clearInterval(shiftInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts.length]);

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        pushAlert,
        dismissAlert,
        clearAlerts,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};
