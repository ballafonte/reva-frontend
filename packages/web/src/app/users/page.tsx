'use client';

import { useRouter } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import { SIZE } from '@reva-frontend/common';
import { useUsersQuery } from '@reva-frontend/common/client';
import { ActivityIndicator, AuthGuard, UsersList } from '@/components/common';

export default function UsersPage() {
  const router = useRouter();
  const { data: users, isLoading, error } = useUsersQuery();

  const handleUserClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  return (
    <AuthGuard>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
            Users
          </Typography>
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
            <Typography color="error">
              Error loading users:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </Typography>
          )}
          {users && <UsersList users={users} onUserClick={handleUserClick} />}
        </Box>
      </Container>
    </AuthGuard>
  );
}
