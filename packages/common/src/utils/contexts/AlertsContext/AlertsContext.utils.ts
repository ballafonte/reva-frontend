import { SeverityContexts } from '@common/theme';
import { getRandomString } from '@common/utils/randomUUID';
import type { Alert } from './AlertsContext';

export const DEFAULT_ALERTS_TIMEOUT = 5_000;

export const formatAlert = (newAlert: Partial<Alert>): Alert => {
  return {
    id: newAlert.id || getRandomString(),
    message: newAlert.message || '',
    severity: newAlert.severity || SeverityContexts.INFO,
    createdAt: newAlert.createdAt || new Date(),
  };
};
