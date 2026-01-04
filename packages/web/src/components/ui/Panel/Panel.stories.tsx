import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from './Panel';

const meta = {
  title: 'UI/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'outlined',
    padding: true,
    children: 'Panel content',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    padding: true,
    children: 'Filled panel content',
  },
};

export const NoPadding: Story = {
  args: {
    variant: 'outlined',
    padding: false,
    children: 'Panel without padding',
  },
};

export const Nested: Story = {
  args: {
    variant: 'outlined',
    padding: true,
    children: (
      <>
        <div>Outer panel content</div>
        <Panel variant="outlined" padding={true} sx={{ mt: 2 }}>
          Inner panel (nested)
        </Panel>
      </>
    ),
  },
};
