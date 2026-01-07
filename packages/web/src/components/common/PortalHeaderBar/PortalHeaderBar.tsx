'use client';

import { COMPONENT_LAYERS, useAuthContext } from '@reva-frontend/common/client';
import { printConsole } from '@reva-frontend/common/utils';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { IconButton } from '@/components/ui/IconButton';
import { Panel } from '@/components/ui/Panel';
import { useRouter } from 'next/navigation';
import { PortalHeaderBarProps } from './PortalHeaderBar.types';

export function PortalHeaderBar({
  position = 'sticky',
  title = process.env.NEXT_PUBLIC_SITE_NAME || 'REVA Portal',
  variant = 'default',
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

  const renderChildren = () => (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, mx: 1 }}>
        {title}
      </Typography>
      <IconButton
        aria-label="sign out"
        component={LogoutIcon}
        context="primary"
        edge={variant === 'default' ? 'end' : undefined}
        onClick={handleSignOut}
        variant={variant === 'default' ? 'contained' : 'ghost'}
        size="sm"
      />
    </>
  );

  if (variant === 'default') {
    return (
      <AppBar position={position} sx={{ mb: 3, zIndex }}>
        <Toolbar>{renderChildren()}</Toolbar>
      </AppBar>
    );
  }

  return (
    <Panel
      padding="lg"
      sx={{ display: 'flex', justifyContent: 'space-between', m: 2, zIndex }}
      variant={variant}
    >
      {renderChildren()}
    </Panel>
  );
}
