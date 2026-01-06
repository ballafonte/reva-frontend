'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  MenuItem,
} from '@mui/material';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
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

export function AddOrganizationDialog({
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
                <Input
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
                <Input
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
                </Input>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            isLoading={isPending}
            onClick={() => {}}
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
