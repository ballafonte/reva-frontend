import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Contexts, ContextType } from '@reva-frontend/common/theme';
import { Tabs } from './Tabs';
import { Tab } from './Tab';
import { Box } from '@mui/material';
import { TabProps } from './Tab.types';

const contextOptions = Object.values(Contexts);

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // @ts-expect-error - context is a prop for Tab, not Tabs, but we want to control it in Storybook
    context: {
      control: 'radio',
      options: contextOptions,
      description: 'Context color for the tabs',
      table: {
        type: { summary: 'ContextType | undefined' },
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta> & {
  args?: {
    context?: ContextType;
  };
};

const tabs = [
  { label: 'Files' },
  { label: 'Activity' },
  { label: 'Calendar' },
  { label: 'Contact' },
] as const satisfies TabProps[];

const DefaultTabsComponent = ({ tabs: tabsProps }: { tabs: TabProps[] }) => {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
        {tabsProps.map((tab) => (
          <Tab key={tab.label} {...tab} />
        ))}
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
  args: {
    context: undefined,
  } as { context?: ContextType },
  render: (args) => (
    <DefaultTabsComponent
      tabs={tabs.map((tab) => ({
        ...tab,
        context: (args as { context?: ContextType }).context,
      }))}
    />
  ),
};

export const WithDifferentColors: Story = {
  args: {
    context: undefined,
  } as { context?: ContextType },
  render: () => (
    <DefaultTabsComponent
      tabs={tabs.map((tab, index) => ({
        ...tab,
        context:
          Object.values(Contexts)[index % Object.values(Contexts).length],
      }))}
    />
  ),
};
