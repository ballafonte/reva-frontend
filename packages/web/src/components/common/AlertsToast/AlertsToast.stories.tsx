import type { Meta, StoryObj } from '@storybook/react';
import { AlertsToast } from './AlertsToast';
import { AlertsProvider } from '@reva-frontend/common';
import { Box } from '@mui/material';

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

export const Default: Story = {
  render: () => {
    // Note: This story requires the AlertsProvider decorator
    // To see the toast, you would need to trigger an alert from another component
    // or add a button that uses useAlertsContext
    return (
      <Box sx={{ p: 3 }}>
        <AlertsToast />
        <p>
          AlertsToast component is rendered. Use useAlertsContext to trigger
          alerts.
        </p>
      </Box>
    );
  },
};
