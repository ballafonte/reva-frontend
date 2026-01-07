'use client';

import { Container, Box } from '@mui/material';
import { SignUpForm } from '@/components/common';

export default function SignUpPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <SignUpForm />
      </Box>
    </Container>
  );
}
