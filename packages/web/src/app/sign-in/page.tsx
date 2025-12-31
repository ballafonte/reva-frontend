'use client';

import { Container, Box } from '@mui/material';
import { SignInForm } from '@/components/SignInForm/SignInForm';

export default function SignInPage() {
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
