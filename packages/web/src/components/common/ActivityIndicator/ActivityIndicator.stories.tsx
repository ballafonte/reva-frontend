import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { ActivityIndicator } from './ActivityIndicator';
import { ActivityIndicatorProps } from './ActivityIndicator.types';
import { Contexts, SIZE } from '@reva-frontend/common';

const contextOptions = Object.values(Contexts);

const meta = {
  title: 'Common/ActivityIndicator',
  component: ActivityIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xsm', 'sm', 'md', 'lg', 'xlg'],
      description: 'Size of the activity indicator',
    },
    context: {
      control: 'radio',
      options: contextOptions,
      description: 'Context of the activity indicator',
    },
    thickness: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Thickness of the circular progress indicator',
    },
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate', 'static'],
      description: 'Variant of the circular progress indicator',
    },
    value: {
      control: { type: 'number', min: 0, max: 100, step: 10 },
      description:
        'The value of the progress indicator for the determinate variant.',
    },
    containerProps: {
      control: false,
    },
    ref: {
      control: false,
    },
  },
} satisfies Meta<typeof ActivityIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

const WithSizeWrapper = ({ size }: ActivityIndicatorProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <ActivityIndicator size={size} />
      <Box sx={{ marginTop: 1, fontSize: 12 }}>{size}</Box>
    </Box>
  );
};

export const AllSizes: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {Object.values(SIZE).map((size) => (
          <WithSizeWrapper key={size} size={size} />
        ))}
      </Box>
    </Box>
  ),
  argTypes: {
    size: { control: false, table: { disable: true } },
  },
};

const WithContextWrapper = ({ context }: ActivityIndicatorProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <ActivityIndicator context={context} />
      <Box sx={{ marginTop: 1, fontSize: 12 }}>{context}</Box>
    </Box>
  );
};

export const AllContexts: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {Object.values(Contexts).map((context) => (
          <WithContextWrapper key={context} context={context} />
        ))}
      </Box>
    </Box>
  ),
  argTypes: {
    context: { control: false, table: { disable: true } },
  },
};

export const CustomThickness: Story = {
  args: {
    size: 'md',
    thickness: 4,
  },
};

export const Determinate: Story = {
  args: {
    size: 'md',
    variant: 'determinate',
    value: 50,
  },
};
