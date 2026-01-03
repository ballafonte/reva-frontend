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
  addOrganizationSchema,
  type AddOrganizationFormData,
} from './AddOrganizationDialog.schema';

export interface AddOrganizationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; status?: string }) => void;
  isPending?: boolean;
}

const statusOptions = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'DELETED', label: 'Deleted' },
];

export default function AddOrganizationDialog({
  open,
  onClose,
  onSubmit,
  isPending = false,
}: AddOrganizationDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddOrganizationFormData>({
    resolver: zodResolver(addOrganizationSchema),
    defaultValues: {
      name: '',
      status: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: '',
        status: undefined,
      });
    }
  }, [open, reset]);

  const onSubmitForm = (data: AddOrganizationFormData) => {
    onSubmit({
      name: data.name,
      status: data.status,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Organization</DialogTitle>
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
                  required
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
                  onChange={(e) =>
                    field.onChange(e.target.value || undefined)
                  }
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
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

