'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { SIZE, type Organization } from '@reva-frontend/common';
import {
  useDisclosure,
  useOrganizationsQuery,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
  useCreateOrganizationMutation,
} from '@reva-frontend/common/client';
import {
  ActivityIndicator,
  AddOrganizationDialog,
  AuthGuard,
  ConfirmDialog,
  EditOrganizationDialog,
  SearchBar,
} from '@/components/common';

export default function OrganizationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchText = searchParams.get('searchText') || undefined;
  const {
    data: organizations,
    isLoading,
    error,
  } = useOrganizationsQuery({
    searchText,
  });
  const deleteMutation = useDeleteOrganizationMutation();
  const updateMutation = useUpdateOrganizationMutation();
  const createMutation = useCreateOrganizationMutation();
  const editDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const [editingOrganization, setEditingOrganization] =
    useState<Organization | null>(null);
  const [organizationToDelete, setOrganizationToDelete] = useState<
    string | null
  >(null);

  const handleEditClick = (organization: Organization) => {
    setEditingOrganization(organization);
    editDisclosure.onOpen();
  };

  const handleEditClose = () => {
    editDisclosure.onClose();
    setEditingOrganization(null);
  };

  const handleEditSubmit = (data: { name?: string; status?: string }) => {
    if (editingOrganization?.id) {
      updateMutation.mutate(
        {
          id: editingOrganization.id,
          body: {
            name: data.name,
            status: data.status as
              | 'ACTIVE'
              | 'INACTIVE'
              | 'PENDING'
              | 'SUSPENDED'
              | 'DELETED'
              | undefined,
          },
        },
        {
          onSuccess: () => {
            handleEditClose();
          },
        }
      );
    }
  };

  const handleDeleteClick = (id: string) => {
    setOrganizationToDelete(id);
    deleteDisclosure.onOpen();
  };

  const handleDeleteConfirm = () => {
    if (organizationToDelete) {
      deleteMutation.mutate(organizationToDelete, {
        onSuccess: () => {
          setOrganizationToDelete(null);
          deleteDisclosure.onClose();
        },
      });
    }
  };

  const handleDeleteClose = () => {
    deleteDisclosure.onClose();
    setOrganizationToDelete(null);
  };

  const handleCreateClick = () => {
    createDisclosure.onOpen();
  };

  const handleCreateClose = () => {
    createDisclosure.onClose();
  };

  const handleCreateSubmit = (data: { name: string; status?: string }) => {
    createMutation.mutate(
      {
        name: data.name,
        status: data.status as
          | 'ACTIVE'
          | 'INACTIVE'
          | 'PENDING'
          | 'SUSPENDED'
          | 'DELETED'
          | undefined,
      },
      {
        onSuccess: () => {
          handleCreateClose();
        },
      }
    );
  };

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set('searchText', value.trim());
    } else {
      params.delete('searchText');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'default';
      case 'PENDING':
        return 'warning';
      case 'SUSPENDED':
        return 'danger';
      case 'DELETED':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <AuthGuard>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h4" component="h1">
              Organizations
            </Typography>
            <IconButton
              aria-label="add organization"
              onClick={handleCreateClick}
              color="primary"
              sx={{ ml: 1 }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ mb: 3 }}>
            <SearchBar
              value={searchText || ''}
              onChange={handleSearchChange}
              placeholder="Search organizations by name or status..."
              label="Search Organizations"
              autoApply={true}
            />
          </Box>
          {isLoading && (
            <ActivityIndicator
              containerProps={{
                sx: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  my: 5,
                  maxWidth: '100%',
                  width: '100%',
                },
              }}
              size={SIZE.xlg * 4}
            />
          )}
          {error && (
            <Typography color="danger">
              Error loading organizations:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </Typography>
          )}
          {organizations && (
            <List>
              {organizations.map((organization: Organization) => (
                <ListItem key={organization.id}>
                  <ListItemText
                    primary={organization.name || 'No name'}
                    secondary={
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          alignItems: 'center',
                          mt: 0.5,
                        }}
                      >
                        <Chip
                          label={organization.status || 'Unknown'}
                          size="small"
                          color={getStatusColor(organization.status)}
                        />
                      </Box>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditClick(organization)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        organization.id && handleDeleteClick(organization.id)
                      }
                      color="danger"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <EditOrganizationDialog
          open={editDisclosure.open}
          onClose={handleEditClose}
          onSubmit={handleEditSubmit}
          initialData={{
            name: editingOrganization?.name || '',
            status: editingOrganization?.status,
          }}
          isPending={updateMutation.isPending}
        />

        <AddOrganizationDialog
          open={createDisclosure.open}
          onClose={handleCreateClose}
          onSubmit={handleCreateSubmit}
          isPending={createMutation.isPending}
        />

        <ConfirmDialog
          open={deleteDisclosure.open}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
          title="Delete Organization"
          message="Are you sure you want to delete this organization?"
          confirmText="Delete"
          cancelText="Cancel"
          confirmColor="danger"
          isPending={deleteMutation.isPending}
        />
      </Container>
    </AuthGuard>
  );
}
