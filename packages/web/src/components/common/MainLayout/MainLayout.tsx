'use client';

import { Box } from '@mui/material';
import { useAuthContext } from '@reva-frontend/common/client';
import { usePathname, useRouter } from 'next/navigation';
import { PortalHeaderBar } from '../PortalHeaderBar/PortalHeaderBar';
import { Sidebar } from '../Sidebar/Sidebar';
import type { MainLayoutProps } from './MainLayout.types';

const DRAWER_WIDTH = 240;

// Routes that should not have the sidebar layout
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export function MainLayout({ children, sidebarMenuItems }: MainLayoutProps) {
  const { isAuthenticated } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  // Don't apply sidebar layout to auth pages
  const isAuthRoute = AUTH_ROUTES.includes(pathname || '');

  // Only show sidebar when authenticated and not on auth routes
  if (!isAuthenticated || isAuthRoute) {
    return <>{children}</>;
  }

  const handleSidebarClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <PortalHeaderBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          menuItems={sidebarMenuItems}
          selectedPath={pathname}
          onClick={handleSidebarClick}
        />
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
    </>
  );
}
