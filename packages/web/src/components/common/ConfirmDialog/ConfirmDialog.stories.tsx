import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from './ConfirmDialog';

const meta = {
  title: 'Common/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        context="danger"
        sx={{ bgcolor: 'error.main', color: 'error.contrastText' }}
      >
        Delete Item
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log('Confirmed');
          setOpen(false);
        }}
        message="Are you sure you want to proceed with this action?"
      />
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
} as unknown as Story;
