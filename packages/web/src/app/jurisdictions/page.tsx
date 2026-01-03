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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  useJurisdictionsQuery,
  useDeleteJurisdictionMutation,
  useUpdateJurisdictionMutation,
  useCreateJurisdictionMutation,
  type Jurisdiction,
  useDisclosure,
} from '@reva-frontend/common';
import {
  AuthGuard,
  AddJurisdictionDialog,
  ConfirmDialog,
  EditJurisdictionDialog,
  SearchBar,
} from '@/components/common';

export default function JurisdictionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchText = searchParams.get('searchText') || undefined;
  const {
    data: jurisdictions,
    isLoading,
    error,
  } = useJurisdictionsQuery({ searchText });
  const deleteMutation = useDeleteJurisdictionMutation();
  const updateMutation = useUpdateJurisdictionMutation();
  const createMutation = useCreateJurisdictionMutation();
  const editDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const [editingJurisdiction, setEditingJurisdiction] =
    useState<Jurisdiction | null>(null);
  const [jurisdictionToDelete, setJurisdictionToDelete] = useState<
    string | null
  >(null);

  const handleEditClick = (jurisdiction: Jurisdiction) => {
    setEditingJurisdiction(jurisdiction);
    editDisclosure.onOpen();
  };

  const handleEditClose = () => {
    editDisclosure.onClose();
    setEditingJurisdiction(null);
  };

  const handleEditSubmit = (data: {
    name: string;
    nameAbbreviation: string;
  }) => {
    if (editingJurisdiction?.id) {
      updateMutation.mutate(
        {
          id: editingJurisdiction.id,
          body: {
            name: data.name,
            nameAbbreviation: data.nameAbbreviation,
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
    setJurisdictionToDelete(id);
    deleteDisclosure.onOpen();
  };

  const handleDeleteConfirm = () => {
    if (jurisdictionToDelete) {
      deleteMutation.mutate(jurisdictionToDelete);
      setJurisdictionToDelete(null);
    }
  };

  const handleDeleteClose = () => {
    deleteDisclosure.onClose();
    setJurisdictionToDelete(null);
  };

  const handleCreateClick = () => {
    createDisclosure.onOpen();
  };

  const handleCreateClose = () => {
    createDisclosure.onClose();
  };

  const handleCreateSubmit = (data: {
    name: string;
    nameAbbreviation: string;
  }) => {
    createMutation.mutate(
      {
        name: data.name,
        nameAbbreviation: data.nameAbbreviation,
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

  return (
    <AuthGuard>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h4" component="h1">
              Jurisdictions
            </Typography>
            <IconButton
              aria-label="add jurisdiction"
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
              placeholder="Search jurisdictions by name or abbreviation..."
              label="Search Jurisdictions"
              autoApply={true}
            />
          </Box>
          {isLoading && <Typography>Loading jurisdictions...</Typography>}
          {error && (
            <Typography color="error">
              Error loading jurisdictions:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </Typography>
          )}
          {jurisdictions && (
            <List>
              {jurisdictions.map((jurisdiction: Jurisdiction) => (
                <ListItem key={jurisdiction.id || jurisdiction.name}>
                  <ListItemText
                    primary={jurisdiction.name || 'Unnamed Jurisdiction'}
                    secondary={
                      jurisdiction.nameAbbreviation || 'No abbreviation'
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditClick(jurisdiction)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        jurisdiction.id && handleDeleteClick(jurisdiction.id)
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

        <EditJurisdictionDialog
          open={editDisclosure.open}
          onClose={handleEditClose}
          onSubmit={handleEditSubmit}
          initialData={{
            name: editingJurisdiction?.name || '',
            nameAbbreviation: editingJurisdiction?.nameAbbreviation || '',
          }}
          isPending={updateMutation.isPending}
        />

        <AddJurisdictionDialog
          open={createDisclosure.open}
          onClose={handleCreateClose}
          onSubmit={handleCreateSubmit}
          isPending={createMutation.isPending}
        />

        <ConfirmDialog
          open={deleteDisclosure.open}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
          title="Delete Jurisdiction"
          message="Are you sure you want to delete this jurisdiction?"
          confirmText="Delete"
          cancelText="Cancel"
          confirmColor="error"
          isPending={deleteMutation.isPending}
        />
      </Container>
    </AuthGuard>
  );
}
