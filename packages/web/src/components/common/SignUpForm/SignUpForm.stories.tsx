import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from './SignUpForm';
import { AuthProvider, AlertsProvider } from '@reva-frontend/common/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme/mui/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const meta = {
  title: 'Common/SignUpForm',
  component: SignUpForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AlertsProvider>
            <AuthProvider>
              <Story />
            </AuthProvider>
          </AlertsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SignUpForm />,
};
