'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Box } from '@mui/material';
import { SignInForm } from '@/components/SignInForm/SignInForm';
import { useAuthContext } from '@/utils/contexts/AuthContext';

export default function SignInPage() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect authenticated users away from sign-in page
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirectTo = searchParams.get('redirectTo');
      const destination = redirectTo ? decodeURIComponent(redirectTo) : '/';
      router.replace(destination);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  // Show nothing while checking auth or redirecting
  if (isLoading || isAuthenticated) {
    return null;
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
