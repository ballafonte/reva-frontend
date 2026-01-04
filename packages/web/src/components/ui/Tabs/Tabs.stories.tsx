import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Tab } from './Tab';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTabsComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
        <Tab label="Files" />
        <Tab label="Activity" />
        <Tab label="Calendar" />
        <Tab label="Contact" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {value === 0 && <div>Files content</div>}
        {value === 1 && <div>Activity content</div>}
        {value === 2 && <div>Calendar content</div>}
        {value === 3 && <div>Contact content</div>}
      </Box>
    </Box>
  );
};

export const Default: Story = {
  render: () => <DefaultTabsComponent />,
};
