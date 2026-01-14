'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { Button } from '@/components/ui/Button';

export interface InactivitySignOutDialogProps {
  open: boolean;
  onClose: () => void;
}

export function InactivitySignOutDialog({
  open,
  onClose,
}: InactivitySignOutDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={false}
    >
      <DialogTitle>Session Expired</DialogTitle>
      <DialogContent>
        <Typography>
          You have been signed out due to inactivity. Please sign in again to
          continue.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
