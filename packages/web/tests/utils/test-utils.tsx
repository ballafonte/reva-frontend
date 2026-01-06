import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { MockAuthProvider } from './MockAuthProvider';
import { theme } from '@/theme/mui/theme';
import { AlertsProvider } from '@reva-frontend/common';

// Create a test QueryClient
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface AllTheProvidersProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

function AllTheProviders({
  children,
  isAuthenticated = false,
}: AllTheProvidersProps) {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertsProvider>
          <MockAuthProvider isAuthenticated={isAuthenticated}>
            {children}
          </MockAuthProvider>
        </AlertsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  isAuthenticated?: boolean;
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { isAuthenticated, ...renderOptions } = options || {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders isAuthenticated={isAuthenticated}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
