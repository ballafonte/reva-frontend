import { List, ListItem, ListItemText, Box, Chip } from '@mui/material';
import type { User } from '@reva-frontend/common';
import { useUserStatus } from '@/utils/hooks/useUserStatus';

interface UsersListProps {
  users: User[];
  onUserClick: (userId: string) => void;
}

export const UsersList = ({ users, onUserClick }: UsersListProps) => {
  return (
    <List>
      {users.map((user: User) => (
        <UserListItem
          key={user.id}
          user={user}
          onUserClick={onUserClick}
        />
      ))}
    </List>
  );
};

interface UserListItemProps {
  user: User;
  onUserClick: (userId: string) => void;
}

const UserListItem = ({ user, onUserClick }: UserListItemProps) => {
  const { color, label } = useUserStatus(user.status);

  const handleClick = () => {
    if (user.id) {
      onUserClick(user.id);
    }
  };

  return (
    <ListItem
      button
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <ListItemText
        primary={user.email ? user.email : 'No email'}
        secondary={
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              mt: 0.5,
            }}
          >
            <Chip label={label} size="small" color={color} />
          </Box>
        }
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  );
};
