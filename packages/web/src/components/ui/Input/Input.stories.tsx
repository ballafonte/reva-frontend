import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { IconButton } from '../IconButton';
import { Input } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outlined', 'filled', 'standard'] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Input',
    variant: 'outlined',
    placeholder: 'Enter text...',
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled Input',
    variant: 'filled',
    placeholder: 'Enter text...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    error: true,
    helperText: 'This field is required',
  },
};

export const WithPrefix: Story = {
  render: () => {
    return (
      <Input label="Search" placeholder="Search..." prefix={<SearchIcon />} />
    );
  },
  argTypes: {
    prefix: { control: false, table: { disable: true } },
  },
};

export const WithSuffix: Story = {
  render: () => {
    const suffix = (
      <IconButton onClick={() => {}} size="sm">
        <VisibilityIcon />
      </IconButton>
    );
    return (
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        suffix={suffix}
      />
    );
  },
  argTypes: {
    suffix: { control: false, table: { disable: true } },
  },
};

export const WithPrefixAndSuffix: Story = {
  render: () => {
    return (
      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        prefix={<EmailIcon />}
        suffix="@example.com"
      />
    );
  },
  argTypes: {
    prefix: { control: false, table: { disable: true } },
    suffix: { control: false, table: { disable: true } },
  },
};

const PasswordWithToggleComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      label="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter password"
      prefix={<LockIcon />}
      suffix={
        <IconButton onClick={() => setShowPassword(!showPassword)} size="sm">
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      }
    />
  );
};

export const PasswordWithToggle: Story = {
  render: () => <PasswordWithToggleComponent />,
};
