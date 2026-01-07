'use client';

import { COMPONENT_LAYERS, useAuthContext } from '@common/client';
import { printConsole } from '@common/utils';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { IconButton } from '@/components/ui/IconButton';
import { useRouter } from 'next/navigation';
import { PortalHeaderBarProps } from './PortalHeaderBar.types';

export function PortalHeaderBar({
  position = 'sticky',
  title = process.env.NEXT_PUBLIC_SITE_NAME || 'REVA Portal',
  zIndex = COMPONENT_LAYERS.FLOATS,
}: PortalHeaderBarProps) {
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

  return (
    <AppBar position={position} sx={{ mb: 3, zIndex }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton
          aria-label="sign out"
          component={LogoutIcon}
          context="primary"
          edge="end"
          onClick={handleSignOut}
          variant="contained"
        />
      </Toolbar>
    </AppBar>
  );
}
