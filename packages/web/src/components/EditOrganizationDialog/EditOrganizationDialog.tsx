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
  MenuItem,
} from '@mui/material';
import {
  editOrganizationSchema,
  type EditOrganizationFormData,
} from './EditOrganizationDialog.schema';

export interface EditOrganizationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name?: string; status?: string }) => void;
  initialData: { name: string; status?: string };
  isPending?: boolean;
}

const statusOptions = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'DELETED', label: 'Deleted' },
];

export default function EditOrganizationDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  isPending = false,
}: EditOrganizationDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditOrganizationFormData>({
    resolver: zodResolver(editOrganizationSchema),
    defaultValues: {
      name: initialData.name || '',
      status: initialData.status,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: initialData.name || '',
        status: initialData.status,
      });
    }
  }, [open, initialData, reset]);

  const onSubmitForm = (data: EditOrganizationFormData) => {
    onSubmit({
      name: data.name,
      status: data.status,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Organization</DialogTitle>
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
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                  fullWidth
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
