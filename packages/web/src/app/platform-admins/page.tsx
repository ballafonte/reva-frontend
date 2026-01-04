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
  type User,
  useDisclosure,
  usePlatformAdminsQuery,
  useSearch,
} from '@reva-frontend/common';
import { AuthGuard, ConfirmDialog, SearchBar } from '@/components/common';

export default function PlatformAdminsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchText = searchParams.get('searchText') || undefined;
  const { data: platformAdmins, isLoading, error } = usePlatformAdminsQuery();
  const deleteDisclosure = useDisclosure();
  const [platformAdminToDelete, setPlatformAdminToDelete] = useState<
    string | null
  >(null);

  const filteredPlatformAdmins = useSearch<User>(
    platformAdmins ?? [],
    ['email', 'status'],
    searchText
  );

  const handleDeleteClick = (id: string) => {
    setPlatformAdminToDelete(id);
    deleteDisclosure.onOpen();
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete mutation when API is ready
    if (platformAdminToDelete) {
      console.log('Delete platform admin:', platformAdminToDelete);
      setPlatformAdminToDelete(null);
      deleteDisclosure.onClose();
    }
  };

  const handleDeleteClose = () => {
    deleteDisclosure.onClose();
    setPlatformAdminToDelete(null);
  };

  const handleCreateClick = () => {
    // TODO: Implement create dialog when API is ready
    console.log('Create platform admin');
  };

  const handleEditClick = (admin: User) => {
    // TODO: Implement edit dialog when API is ready
    console.log('Edit platform admin:', admin);
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

  return (
    <AuthGuard>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h4" component="h1">
              Platform Admins
            </Typography>
            <IconButton
              aria-label="add platform admin"
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
              placeholder="Search platform admins by email or status..."
              label="Search Platform Admins"
              autoApply={true}
            />
          </Box>
          {isLoading && <Typography>Loading platform admins...</Typography>}
          {error && (
            <Typography color="danger">
              Error loading platform admins:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </Typography>
          )}
          {filteredPlatformAdmins && (
            <List>
              {filteredPlatformAdmins.map((admin: User) => (
                <ListItem key={admin.id}>
                  <ListItemText
                    primary={admin.email || 'No email'}
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
                          label={admin.status || 'Unknown'}
                          size="small"
                          color={
                            admin.status === 'ACTIVE'
                              ? 'success'
                              : admin.status === 'INACTIVE'
                                ? 'default'
                                : 'warning'
                          }
                        />
                        {admin.platformAdminStatus?.isSuperAdmin && (
                          <Chip
                            label="Super Admin"
                            size="small"
                            color="primary"
                          />
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditClick(admin)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => admin.id && handleDeleteClick(admin.id)}
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

        <ConfirmDialog
          open={deleteDisclosure.open}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
          title="Delete Platform Admin"
          message="Are you sure you want to delete this platform admin?"
          confirmText="Delete"
          cancelText="Cancel"
          confirmColor="danger"
          isPending={false}
        />
      </Container>
    </AuthGuard>
  );
}
