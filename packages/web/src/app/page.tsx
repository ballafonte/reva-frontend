'use client';

import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'REVA Portal';

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 8,
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 4 }}>
          {siteName}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Welcome to Our Platform
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/sign-in')}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/sign-up')}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
