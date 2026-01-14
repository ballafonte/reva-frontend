'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import { SIZE, type User } from '@reva-frontend/common';
import { useUsersQuery, useSearch } from '@reva-frontend/common/client';
import {
  ActivityIndicator,
  AuthGuard,
  UsersList,
  SearchBar,
} from '@/components/common';

export default function UsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchText = searchParams.get('searchText') || undefined;
  const { data: users, isLoading, error } = useUsersQuery();

  const filteredUsers = useSearch<User>(
    users ?? [],
    ['email', 'status'],
    searchText
  );

  const handleUserClick = (userId: string) => {
    router.push(`/users/${userId}`);
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
          <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
            Users
          </Typography>
          <Box sx={{ mb: 3 }}>
            <SearchBar
              value={searchText || ''}
              onChange={handleSearchChange}
              placeholder="Search users by email or status..."
              label="Search Users"
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
            <Typography color="error">
              Error loading users:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </Typography>
          )}
          {filteredUsers && (
            <UsersList users={filteredUsers} onUserClick={handleUserClick} />
          )}
        </Box>
      </Container>
    </AuthGuard>
  );
}
