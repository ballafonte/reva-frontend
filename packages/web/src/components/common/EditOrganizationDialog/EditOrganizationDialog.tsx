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
  editOrganizationSchema,
  type EditOrganizationFormData,
} from './EditOrganizationDialog.schema';
import { OrganizationStatus } from '@reva-frontend/common';

export interface EditOrganizationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name?: string; status?: OrganizationStatus }) => void;
  initialData: { name: string; status?: OrganizationStatus };
  isPending?: boolean;
}

const statusOptions = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'DELETED', label: 'Deleted' },
];

export function EditOrganizationDialog({
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
                <Input
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
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
