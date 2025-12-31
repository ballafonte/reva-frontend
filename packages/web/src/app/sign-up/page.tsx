'use client';

import { Container, Box } from '@mui/material';
import { SignUpForm } from '@/components/SignUpForm/SignUpForm';

export default function SignUpPage() {
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
        <SignUpForm />
      </Box>
    </Container>
  );
}
