'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

export interface EditJurisdictionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; nameAbbreviation: string }) => void;
  initialData: { name: string; nameAbbreviation: string };
  isPending?: boolean;
}

export default function EditJurisdictionDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  isPending = false,
}: EditJurisdictionDialogProps) {
  const [formData, setFormData] = useState({ name: '', nameAbbreviation: '' });

  useEffect(() => {
    if (open) {
      setFormData({
        name: initialData.name || '',
        nameAbbreviation: initialData.nameAbbreviation || '',
      });
    }
  }, [open, initialData]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Jurisdiction</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Name Abbreviation"
            value={formData.nameAbbreviation}
            onChange={(e) => setFormData({ ...formData, nameAbbreviation: e.target.value })}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

