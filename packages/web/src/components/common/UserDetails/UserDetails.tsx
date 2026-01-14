import { Typography, Box, Chip, Paper } from '@mui/material';
import type { User } from '@reva-frontend/common';
import { useUserStatus } from '@/utils/hooks/useUserStatus';

interface UserDetailsProps {
  user: User;
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return dateString;
  }
};

export const UserDetails = ({ user }: UserDetailsProps) => {
  const { color, label } = useUserStatus(user.status);

  return (
    <Paper sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        User Information
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Email
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {user.email ? user.email : 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip label={label} size="small" color={color} />
        </Box>
        {user.createdAt && (
          <>
            <Typography variant="body2" color="text.secondary">
              Created At
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {formatDate(user.createdAt)}
            </Typography>
          </>
        )}
        {user.updatedAt && (
          <>
            <Typography variant="body2" color="text.secondary">
              Updated At
            </Typography>
            <Typography variant="body1">
              {formatDate(user.updatedAt)}
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
};
