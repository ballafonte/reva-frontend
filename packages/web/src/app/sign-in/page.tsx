'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, Container } from '@mui/material';
import {
  ActivityIndicator,
  InactivitySignOutDialog,
  SignInForm,
} from '@/components/common';
import { authStore, SIZE } from '@reva-frontend/common';
import { useAuthContext } from '@reva-frontend/common/client';

export default function SignInPage() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hasRedirected = useRef(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  // Check for inactivity sign-out flag and show modal
  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      const inactivitySignOut = sessionStorage.getItem('inactivitySignOut');
      if (inactivitySignOut === 'true') {
        setShowInactivityModal(true);
        // Clear the flag after showing modal
        sessionStorage.removeItem('inactivitySignOut');
      }
    }
  }, []);

  // Redirect authenticated users away from sign-in page
  useEffect(() => {
    // Check both isAuthenticated state and token store as fallback
    const token = authStore.getToken();
    const shouldRedirect =
      !isLoading &&
      (isAuthenticated || !!token) &&
      !hasRedirected.current &&
      pathname === '/sign-in';

    if (shouldRedirect) {
      hasRedirected.current = true;
      const redirectTo = searchParams.get('redirectTo');
      const destination = redirectTo
        ? decodeURIComponent(redirectTo)
        : '/jurisdictions';
      // Use replace to avoid adding sign-in page to history
      router.replace(destination);
    }
  }, [isAuthenticated, isLoading, router, searchParams, pathname]);

  // Show loading while checking auth
  if (isLoading || isAuthenticated) {
    return (
      <Container component="main" maxWidth="xs">
        <ActivityIndicator
          containerProps={{
            sx: {
              margin: 'auto',
              minHeight: '100vh',
            },
          }}
          size={SIZE.xlg * 4}
        />
      </Container>
    );
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <SignInForm />
        </Box>
      </Container>
      <InactivitySignOutDialog
        open={showInactivityModal}
        onClose={() => setShowInactivityModal(false)}
      />
    </>
  );
}
