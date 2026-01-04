'use client';

import { useAlertsContext } from '@reva-frontend/common';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

/**
 * Maps severity from AlertsContext to MUI Alert severity
 */
const mapSeverityToMui = (
  severity: string
): 'success' | 'info' | 'warning' | 'danger' => {
  switch (severity) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'danger';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
};

/**
 * Component that displays alerts as toast notifications at the bottom of the screen
 */
export function AlertsToast() {
  const { alerts, dismissAlert } = useAlertsContext();
  const [open, setOpen] = useState(false);

  // Show the first alert in the queue
  const currentAlert = alerts.length > 0 ? alerts[0] : null;

  // Update open state when currentAlert changes
  useEffect(() => {
    if (currentAlert) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentAlert]);

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      // Don't close on clickaway - only on timeout or manual close
      if (reason === 'clickaway') {
        return;
      }

      if (currentAlert) {
        dismissAlert(currentAlert.id);
        setOpen(false);
      }
    },
    [currentAlert, dismissAlert]
  );

  if (!currentAlert) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      key={currentAlert.id}
    >
      <MuiAlert
        onClose={handleClose}
        severity={mapSeverityToMui(currentAlert.severity)}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {currentAlert.message}
      </MuiAlert>
    </Snackbar>
  );
}
