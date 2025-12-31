'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { initializeApp, useInitializedApp } from '@/utils/initialization';
import { AuthProvider } from '@/utils/contexts/AuthProvider';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize API configuration synchronously before anything else
  useState(() => {
    // Run initialization immediately when component initializes
    initializeApp();
    return true;
  });

  // Also use the hook as a backup (runs in useEffect)
  useInitializedApp();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
