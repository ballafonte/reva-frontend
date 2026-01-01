'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import { signInSchema, type SignInFormData } from './SignInForm.schema';
import { useAuthContext } from '@/utils/contexts/AuthContext';
import {
  useAlertsContext,
  SeverityContexts,
  ApiError,
  DEFAULT_ERROR_MESSAGE,
} from '@reva-frontend/common';

export function SignInForm() {
  const { signIn } = useAuthContext();
  const { pushAlert } = useAlertsContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    try {
      await signIn(data.email, data.password);
      // Redirect is handled by SignInPage useEffect when isAuthenticated becomes true
    } catch (err) {
      let errorMessage = DEFAULT_ERROR_MESSAGE;

      // If the error is an ApiError with an ErrorResponse message, use that
      if (err instanceof ApiError && err.errorResponse?.message) {
        errorMessage = err.errorResponse.message;
      }

      pushAlert({
        message: errorMessage,
        severity: SeverityContexts.DANGER,
      });
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        Sign In
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, width: '100%' }}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <MuiLink component={Link} href="/sign-up">
              Sign up
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
