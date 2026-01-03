'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useAuthContext } from '@reva-frontend/common';

const DRAWER_WIDTH = 240;

// Routes that should not have the sidebar layout
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();
  const pathname = usePathname();

  // Don't apply sidebar layout to auth pages
  const isAuthRoute = AUTH_ROUTES.includes(pathname || '');

  // Only show sidebar when authenticated and not on auth routes
  if (!isAuthenticated || isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
