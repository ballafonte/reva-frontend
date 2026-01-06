import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AddOrganizationDialog } from './AddOrganizationDialog';

const meta = {
  title: 'Common/AddOrganizationDialog',
  component: AddOrganizationDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddOrganizationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Organization
      </Button>
      <AddOrganizationDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log('Submitted:', data);
          setOpen(false);
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
} as unknown as Story;
