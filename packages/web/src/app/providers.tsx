'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { initializeApp, useInitializedApp } from '@/utils/initialization';
import { AlertsProvider, AuthProvider } from '@reva-frontend/common';
import { theme } from '@/theme/mui/theme';

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
        <AlertsProvider>
          <AuthProvider>{children}</AuthProvider>
        </AlertsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
