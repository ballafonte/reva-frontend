'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { editJurisdictionSchema, type EditJurisdictionFormData } from './EditJurisdictionDialog.schema';

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditJurisdictionFormData>({
    resolver: zodResolver(editJurisdictionSchema),
    defaultValues: {
      name: initialData.name || '',
      nameAbbreviation: initialData.nameAbbreviation || '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: initialData.name || '',
        nameAbbreviation: initialData.nameAbbreviation || '',
      });
    }
  }, [open, initialData, reset]);

  const onSubmitForm = (data: EditJurisdictionFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Jurisdiction</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="nameAbbreviation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name Abbreviation"
                  fullWidth
                  error={!!errors.nameAbbreviation}
                  helperText={errors.nameAbbreviation?.message}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

