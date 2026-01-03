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
import {
  type Organization,
  useDisclosure,
  useOrganizationsQuery,
  useSearch,
} from '@reva-frontend/common';
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import SearchBar from '@/components/SearchBar/SearchBar';
import AuthGuard from '@/components/AuthGuard/AuthGuard';

export default function OrganizationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchText = searchParams.get('searchText') || undefined;
  const { data: organizations, isLoading, error } = useOrganizationsQuery({
    searchText,
  });
  const deleteDisclosure = useDisclosure();
  const [organizationToDelete, setOrganizationToDelete] = useState<
    string | null
  >(null);

  const filteredOrganizations = useSearch(
    organizations,
    ['name', 'status'],
    searchText
  );

  const handleDeleteClick = (id: string) => {
    setOrganizationToDelete(id);
    deleteDisclosure.onOpen();
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete mutation when API is ready
    if (organizationToDelete) {
      console.log('Delete organization:', organizationToDelete);
      setOrganizationToDelete(null);
      deleteDisclosure.onClose();
    }
  };

  const handleDeleteClose = () => {
    deleteDisclosure.onClose();
    setOrganizationToDelete(null);
  };

  const handleCreateClick = () => {
    // TODO: Implement create dialog when API is ready
    console.log('Create organization');
  };

  const handleEditClick = (organization: Organization) => {
    // TODO: Implement edit dialog when API is ready
    console.log('Edit organization:', organization);
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
        return 'error';
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
          {isLoading && <Typography>Loading organizations...</Typography>}
          {error && (
            <Typography color="error">
              Error loading organizations:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </Typography>
          )}
          {filteredOrganizations && (
            <List>
              {filteredOrganizations.map((organization: Organization) => (
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
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <ConfirmDialog
          open={deleteDisclosure.open}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
          title="Delete Organization"
          message="Are you sure you want to delete this organization?"
          confirmText="Delete"
          cancelText="Cancel"
          confirmColor="error"
          isPending={false}
        />
      </Container>
    </AuthGuard>
  );
}

