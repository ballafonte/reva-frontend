import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { EditOrganizationDialog } from './EditOrganizationDialog';

const meta = {
  title: 'Common/EditOrganizationDialog',
  component: EditOrganizationDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditOrganizationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Edit Organization
      </Button>
      <EditOrganizationDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log('Submitted:', data);
          setOpen(false);
        }}
        initialData={{
          name: 'Example Organization',
          status: 'ACTIVE',
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
} as unknown as Story;
