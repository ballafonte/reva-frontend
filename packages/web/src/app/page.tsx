'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
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
} from '@reva-frontend/common';

export default function Home() {
  const { data: jurisdictions, isLoading, error } = useJurisdictionsQuery();
  const deleteMutation = useDeleteJurisdictionMutation();
  const updateMutation = useUpdateJurisdictionMutation();
  const createMutation = useCreateJurisdictionMutation();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingJurisdiction, setEditingJurisdiction] = useState<Jurisdiction | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', nameAbbreviation: '' });
  const [createFormData, setCreateFormData] = useState({ name: '', nameAbbreviation: '' });

  const handleEditClick = (jurisdiction: Jurisdiction) => {
    setEditingJurisdiction(jurisdiction);
    setEditFormData({
      name: jurisdiction.name || '',
      nameAbbreviation: jurisdiction.nameAbbreviation || '',
    });
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditingJurisdiction(null);
    setEditFormData({ name: '', nameAbbreviation: '' });
  };

  const handleEditSave = () => {
    if (editingJurisdiction?.id) {
      updateMutation.mutate(
        {
          id: editingJurisdiction.id,
          body: {
            name: editFormData.name,
            nameAbbreviation: editFormData.nameAbbreviation,
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
    if (window.confirm('Are you sure you want to delete this jurisdiction?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCreateClick = () => {
    setCreateFormData({ name: '', nameAbbreviation: '' });
    setCreateModalOpen(true);
  };

  const handleCreateClose = () => {
    setCreateModalOpen(false);
    setCreateFormData({ name: '', nameAbbreviation: '' });
  };

  const handleCreateSave = () => {
    createMutation.mutate(
      {
        name: createFormData.name,
        nameAbbreviation: createFormData.nameAbbreviation,
      },
      {
        onSuccess: () => {
          handleCreateClose();
        },
      }
    );
  };

  return (
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
        {isLoading && <Typography>Loading jurisdictions...</Typography>}
        {error && (
          <Typography color="error">
            Error loading jurisdictions: {error instanceof Error ? error.message : 'Unknown error'}
          </Typography>
        )}
        {jurisdictions && (
          <List>
            {jurisdictions.map((jurisdiction: Jurisdiction) => (
              <ListItem key={jurisdiction.id || jurisdiction.name}>
                <ListItemText
                  primary={jurisdiction.name || 'Unnamed Jurisdiction'}
                  secondary={jurisdiction.nameAbbreviation || 'No abbreviation'}
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
                    onClick={() => jurisdiction.id && handleDeleteClick(jurisdiction.id)}
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

      <Dialog open={editModalOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Jurisdiction</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Name Abbreviation"
              value={editFormData.nameAbbreviation}
              onChange={(e) =>
                setEditFormData({ ...editFormData, nameAbbreviation: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createModalOpen} onClose={handleCreateClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Jurisdiction</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              value={createFormData.name}
              onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Name Abbreviation"
              value={createFormData.nameAbbreviation}
              onChange={(e) =>
                setCreateFormData({ ...createFormData, nameAbbreviation: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button
            onClick={handleCreateSave}
            variant="contained"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

