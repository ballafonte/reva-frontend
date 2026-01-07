'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Container, Box, CircularProgress } from '@mui/material';
import { SignInForm } from '@/components/common';
import { authStore } from '@reva-frontend/common';
import { useAuthContext } from '@reva-frontend/common/client';

export default function SignInPage() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

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
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SignInForm />
      </Box>
    </Container>
  );
}
