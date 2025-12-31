import { SeverityContextType } from '@common/theme';
import { createContext, useContext } from 'react';

export type Alert = {
  id: string;
  createdAt: Date;
  message: string;
  severity: SeverityContextType;
};

export interface AlertsContextType {
  alerts: Alert[];
  pushAlert: (_: Partial<Alert>) => void;
  dismissAlert: (_: Alert['id']) => void;
}

export const AlertsContext = createContext<AlertsContextType>({
  alerts: [],
  pushAlert: () => undefined,
  dismissAlert: () => undefined,
});

/**
 * Hook to access the auth context
 * @returns The auth context value
 * @throws Error if used outside AuthProvider
 */
export function useAlertsContext(): AlertsContextType {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlertsContext must be used within an AlertsProvider');
  }
  return context;
}
