import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@mui/material';
import { EditJurisdictionDialog } from './EditJurisdictionDialog';

const meta = {
  title: 'Common/EditJurisdictionDialog',
  component: EditJurisdictionDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditJurisdictionDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Edit Jurisdiction
      </Button>
      <EditJurisdictionDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log('Submitted:', data);
          setOpen(false);
        }}
        initialData={{
          name: 'Example Jurisdiction',
          nameAbbreviation: 'EJ',
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
} as unknown as Story;
