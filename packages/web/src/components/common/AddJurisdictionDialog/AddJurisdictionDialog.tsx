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
} from '@mui/material';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  addJurisdictionSchema,
  type AddJurisdictionFormData,
} from './AddJurisdictionDialog.schema';

export interface AddJurisdictionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; nameAbbreviation: string }) => void;
  isPending?: boolean;
}

export function AddJurisdictionDialog({
  open,
  onClose,
  onSubmit,
  isPending = false,
}: AddJurisdictionDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddJurisdictionFormData>({
    resolver: zodResolver(addJurisdictionSchema),
    defaultValues: {
      name: '',
      nameAbbreviation: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: '',
        nameAbbreviation: '',
      });
    }
  }, [open, reset]);

  const onSubmitForm = (data: AddJurisdictionFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Jurisdiction</DialogTitle>
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
              name="nameAbbreviation"
              control={control}
              render={({ field }) => (
                <Input
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
