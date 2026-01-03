'use client';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { printConsole } from '@common/utils';
import { useAuthContext } from '@reva-frontend/common';
import { useRouter } from 'next/navigation';

export default function PortalHeaderBar() {
  const { isAuthenticated, logout } = useAuthContext();
  const router = useRouter();

  // Only render if authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/sign-in');
    } catch (error) {
      // Error handling is done in the logout function
      printConsole('error', 'Sign out error:', error);
    }
  };

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'REVA Portal';

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {siteName}
        </Typography>
        <IconButton
          color="inherit"
          onClick={handleSignOut}
          aria-label="sign out"
          edge="end"
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
