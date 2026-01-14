import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { InactivitySignOutDialog } from './InactivitySignOutDialog';

const meta = {
  title: 'Common/InactivitySignOutDialog',
  component: InactivitySignOutDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InactivitySignOutDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ bgcolor: 'error.main', color: 'error.contrastText' }}
      >
        Show Inactivity Sign-Out Dialog
      </Button>
      <InactivitySignOutDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
} as unknown as Story;
