import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from './Panel';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const meta = {
  title: 'UI/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
    },
  },
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

const HeaderSuffix = () => {
  return (
    <IconButton
      onClick={() => console.log('More options')}
      component={MoreVertIcon}
    />
  );
};

const FooterActions = () => {
  return (
    <>
      <Button onClick={() => {}} variant="outlined" context="secondary">
        Cancel
      </Button>
      <Button
        onClick={() => {}}
        variant="contained"
        context="primary"
        sx={{ ml: 1 }}
      >
        Save
      </Button>
    </>
  );
};

export const Default: Story = {
  args: {
    variant: 'outlined',
    children: 'Panel content',
  },
};

export const WithHeader: Story = {
  args: {
    variant: 'outlined',
    header: {
      title: 'Panel Title',
      suffix: <HeaderSuffix />,
    },
    children: <div>Panel content goes here</div>,
  },
};

export const WithFooter: Story = {
  args: {
    variant: 'outlined',
    footer: {
      children: <FooterActions />,
      sx: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
    children: <div>Panel content goes here</div>,
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    variant: 'outlined',
    header: {
      title: 'Panel with Header and Footer',
      suffix: <HeaderSuffix />,
    },
    footer: {
      children: <FooterActions />,
      sx: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
    children: (
      <>
        <div>Panel content goes here. This is the main content area.</div>
      </>
    ),
  },
};

export const Nested: Story = {
  args: {
    variant: 'outlined',
    header: {
      title: 'Outer panel',
    },
    children: (
      <Panel variant="outlined" padding={true} sx={{ mt: 2 }}>
        Inner panel (nested)
      </Panel>
    ),
  },
};
