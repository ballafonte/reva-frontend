import type { Meta, StoryObj } from '@storybook/react';
import { AlertsToast } from './AlertsToast';
import {
  AlertsProvider,
  useAlertsContext,
  SeverityContexts,
} from '@reva-frontend/common';
import { Box, Stack, Typography } from '@mui/material';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'Common/AlertsToast',
  component: AlertsToast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AlertsProvider>
        <Story />
      </AlertsProvider>
    ),
  ],
} satisfies Meta<typeof AlertsToast>;

export default meta;
type Story = StoryObj<typeof meta>;

const AlertDemo = () => {
  const { pushAlert, clearAlerts } = useAlertsContext();

  return (
    <Box sx={{ p: 3, minHeight: 250 }}>
      <Typography variant="h6" gutterBottom>
        AlertsToast Demo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Click the buttons below to trigger different types of alerts.
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button
          variant="contained"
          context="success"
          onClick={() => {
            clearAlerts();
            pushAlert({
              message: 'Operation completed successfully!',
              severity: SeverityContexts.SUCCESS,
            });
          }}
        >
          Success Alert
        </Button>
        <Button
          variant="contained"
          context="info"
          onClick={() => {
            clearAlerts();
            pushAlert({
              message: 'Here is some helpful information.',
              severity: SeverityContexts.INFO,
            });
          }}
        >
          Info Alert
        </Button>
        <Button
          variant="contained"
          context="warning"
          onClick={() => {
            clearAlerts();
            pushAlert({
              message: 'Warning: Please review this action.',
              severity: SeverityContexts.WARNING,
            });
          }}
        >
          Warning Alert
        </Button>
        <Button
          variant="contained"
          context="danger"
          onClick={() => {
            clearAlerts();
            pushAlert({
              message: 'Error: Something went wrong.',
              severity: SeverityContexts.DANGER,
            });
          }}
          sx={{ bgcolor: 'error.main', color: 'error.contrastText' }}
        >
          Error Alert
        </Button>
      </Stack>
      <AlertsToast />
    </Box>
  );
};

export const Default: Story = {
  render: () => <AlertDemo />,
};
