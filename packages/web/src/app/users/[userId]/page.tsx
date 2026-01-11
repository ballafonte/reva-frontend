'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Button,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SIZE, type Session } from '@reva-frontend/common';
import {
  useUserQuery,
  useUserSessionsQuery,
  useRevokeSessionMutation,
  useRevokeUserSessionsMutation,
  useDisclosure,
} from '@reva-frontend/common/client';
import {
  ActivityIndicator,
  AuthGuard,
  ConfirmDialog,
  UserDetails,
} from '@/components/common';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.userId as string;

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useUserQuery({ id: userId });
  const {
    data: sessions,
    isLoading: isLoadingSessions,
    error: sessionsError,
  } = useUserSessionsQuery();

  const revokeSessionMutation = useRevokeSessionMutation();
  const revokeUserSessionsMutation = useRevokeUserSessionsMutation();
  const deleteSessionDisclosure = useDisclosure();
  const deleteAllSessionsDisclosure = useDisclosure();
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const handleBackClick = () => {
    router.push('/users');
  };

  const handleDeleteSessionClick = (sessionId: string) => {
    setSessionToDelete(sessionId);
    deleteSessionDisclosure.onOpen();
  };

  const handleDeleteSessionConfirm = () => {
    if (sessionToDelete) {
      revokeSessionMutation.mutate(
        { sessionId: sessionToDelete },
        {
          onSuccess: () => {
            setSessionToDelete(null);
            deleteSessionDisclosure.onClose();
          },
        }
      );
    }
  };

  const handleDeleteSessionClose = () => {
    deleteSessionDisclosure.onClose();
    setSessionToDelete(null);
  };

  const handleDeleteAllSessionsClick = () => {
    deleteAllSessionsDisclosure.onOpen();
  };

  const handleDeleteAllSessionsConfirm = () => {
    if (userId) {
      revokeUserSessionsMutation.mutate(
        { userId },
        {
          onSuccess: () => {
            deleteAllSessionsDisclosure.onClose();
          },
        }
      );
    }
  };

  const handleDeleteAllSessionsClose = () => {
    deleteAllSessionsDisclosure.onClose();
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <AuthGuard>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <IconButton onClick={handleBackClick} aria-label="go back">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              User Details
            </Typography>
          </Box>

          {(isLoadingUser || isLoadingSessions) && (
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

          {userError && (
            <Typography color="error">
              Error loading user:{' '}
              {userError instanceof Error ? userError.message : 'Unknown error'}
            </Typography>
          )}

          {user && <UserDetails user={user} />}

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Sessions</Typography>
            {userId && (
              <Button
                variant="outlined"
                onClick={handleDeleteAllSessionsClick}
                disabled={revokeUserSessionsMutation.isPending}
                sx={{ color: 'error.main', borderColor: 'error.main' }}
              >
                Delete All Sessions
              </Button>
            )}
          </Box>

          {sessionsError && (
            <Typography color="error">
              Error loading sessions:{' '}
              {sessionsError instanceof Error
                ? sessionsError.message
                : 'Unknown error'}
            </Typography>
          )}

          {sessions && sessions.length > 0 ? (
            <List>
              {sessions.map((session: Session) => (
                <ListItem key={session.id}>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="body1">{session.id}</Typography>
                        {session.isCurrent && (
                          <Chip label="Current" size="small" color="primary" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          IP Address: {session.ipAddress || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          User Agent: {session.userAgent || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Last Activity: {formatDate(session.lastActivity)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Created: {formatDate(session.createdAt)}
                        </Typography>
                      </Box>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete session"
                      onClick={() => handleDeleteSessionClick(session.id)}
                      disabled={session.isCurrent}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            !isLoadingSessions && (
              <Typography color="text.secondary" sx={{ py: 3 }}>
                No sessions found.
              </Typography>
            )
          )}
        </Box>

        <ConfirmDialog
          open={deleteSessionDisclosure.open}
          onClose={handleDeleteSessionClose}
          onConfirm={handleDeleteSessionConfirm}
          title="Delete Session"
          message="Are you sure you want to delete this session?"
          confirmText="Delete"
          cancelText="Cancel"
          confirmColor="danger"
          isPending={revokeSessionMutation.isPending}
        />

        <ConfirmDialog
          open={deleteAllSessionsDisclosure.open}
          onClose={handleDeleteAllSessionsClose}
          onConfirm={handleDeleteAllSessionsConfirm}
          title="Delete All Sessions"
          message="Are you sure you want to delete all sessions for this user?"
          confirmText="Delete All"
          cancelText="Cancel"
          confirmColor="danger"
          isPending={revokeUserSessionsMutation.isPending}
        />
      </Container>
    </AuthGuard>
  );
}
