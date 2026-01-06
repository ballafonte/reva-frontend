import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';
import FolderIcon from '@mui/icons-material/Folder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import LabelIcon from '@mui/icons-material/Label';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { Contexts, ContextType } from '@common/theme';

const meta = {
  title: 'Common/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['tile', 'contained', 'outlined', 'ghost'],
    },
    selected: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    context: {
      control: 'select',
      options: ['default', ...Object.values(Contexts)],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    onClick: {
      control: false,
    },
    prefix: {
      control: false,
    },
    suffix: {
      control: false,
    },
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'All Files',
    prefix: <FolderIcon />,
    suffix: <ExpandMoreIcon />,
    variant: 'tile',
    selected: true,
  },
};

export const Tile: Story = {
  args: {
    label: 'All Files',
    prefix: <FolderIcon />,
    suffix: <ExpandMoreIcon />,
    variant: 'tile',
    selected: true,
  },
};

export const Contained: Story = {
  args: {
    label: 'Files',
    prefix: <FolderIcon />,
    variant: 'contained',
    selected: true,
  },
};

export const Outlined: Story = {
  args: {
    label: 'Files',
    prefix: <FolderIcon />,
    variant: 'outlined',
    selected: true,
  },
};

export const Ghost: Story = {
  args: {
    label: 'Recent',
    prefix: <AccessTimeIcon />,
    variant: 'ghost',
    selected: false,
  },
};

export const VerticalMenu: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '250px',
        padding: 2,
        backgroundColor: '#fff',
      }}
    >
      <MenuItem
        label="All Files"
        prefix={<FolderIcon />}
        suffix={<ExpandMoreIcon />}
        variant="tile"
        selected={true}
      />
      <MenuItem
        label="Recent"
        prefix={<AccessTimeIcon />}
        variant="ghost"
        selected={false}
      />
      <MenuItem
        label="Favorites"
        prefix={<FavoriteBorderIcon />}
        variant="ghost"
        selected={false}
      />
      <MenuItem
        label="Shared"
        prefix={<ShareIcon />}
        variant="ghost"
        selected={false}
      />
      <MenuItem
        label="Tags"
        prefix={<LabelIcon />}
        variant="ghost"
        selected={false}
      />
      <Box
        sx={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <MenuItem
          label="Settings"
          prefix={<SettingsIcon />}
          variant="ghost"
          selected={false}
        />
        <MenuItem
          label="Deleted Files"
          prefix={<DeleteIcon />}
          variant="ghost"
          selected={false}
        />
      </Box>
    </Box>
  ),
};

export const HorizontalMenu: Story = {
  render: () => (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        display: 'inline-flex',
        gap: 1,
        padding: 2,
      }}
    >
      <MenuItem
        label="Files"
        prefix={<FolderIcon />}
        variant="tile"
        selected={true}
        onClick={() => {}}
      />
      <MenuItem
        label="Activity"
        prefix={<AccessTimeIcon />}
        variant="ghost"
        selected={false}
        onClick={() => {}}
      />
      <MenuItem
        label="Calendar"
        prefix={<LabelIcon />}
        variant="ghost"
        selected={false}
        onClick={() => {}}
      />
      <MenuItem
        label="Contact"
        prefix={<SettingsIcon />}
        variant="ghost"
        selected={false}
        onClick={() => {}}
      />
    </Box>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '250px',
        padding: 2,
      }}
    >
      <MenuItem
        label="All Files"
        prefix={<FolderIcon />}
        suffix={<ExpandMoreIcon />}
        variant="tile"
        selected={true}
      />
      <MenuItem
        label="Item with Badge"
        prefix={<FolderIcon />}
        suffix={<Box sx={{ fontSize: '12px', color: 'inherit' }}>3</Box>}
        variant="ghost"
        selected={false}
      />
      <MenuItem
        label="Item with Icon"
        prefix={<FolderIcon />}
        suffix={<SettingsIcon />}
        variant="ghost"
        selected={false}
      />
    </Box>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '250px',
        padding: 2,
      }}
    >
      <MenuItem
        label="Enabled Item"
        prefix={<FolderIcon />}
        variant="tile"
        selected={true}
      />
      <MenuItem
        label="Disabled Item"
        prefix={<FolderIcon />}
        variant="tile"
        selected={false}
        disabled={true}
      />
      <MenuItem
        label="Disabled Selected"
        prefix={<FolderIcon />}
        variant="contained"
        selected={true}
        disabled={true}
      />
    </Box>
  ),
};

export const WithContext: Story = {
  render: () => {
    const contextOptions: ContextType[] = [
      Contexts.PRIMARY,
      Contexts.SECONDARY,
      Contexts.TERTIARY,
      Contexts.SUCCESS,
      Contexts.WARNING,
      Contexts.DANGER,
      Contexts.INFO,
    ];

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '300px',
          padding: 2,
        }}
      >
        {contextOptions.map((context) => (
          <Box
            key={context}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <MenuItem
              label={`${context} (Selected)`}
              prefix={<FolderIcon />}
              variant="tile"
              selected={true}
              context={context}
            />
            <MenuItem
              label={`${context} (Unselected)`}
              prefix={<FolderIcon />}
              variant="tile"
              selected={false}
              context={context}
            />
          </Box>
        ))}
      </Box>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '300px',
          padding: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MenuItem
            label="Small Size"
            prefix={<FolderIcon />}
            variant="tile"
            selected={true}
            size="sm"
            onClick={() => {}}
          />
          <MenuItem
            label="Small Size (Unselected)"
            prefix={<AccessTimeIcon />}
            variant="ghost"
            selected={false}
            size="sm"
            onClick={() => {}}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MenuItem
            label="Medium Size (Default)"
            prefix={<FolderIcon />}
            variant="tile"
            selected={true}
            size="md"
            onClick={() => {}}
          />
          <MenuItem
            label="Medium Size (Unselected)"
            prefix={<AccessTimeIcon />}
            variant="ghost"
            selected={false}
            size="md"
            onClick={() => {}}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MenuItem
            label="Large Size"
            prefix={<FolderIcon />}
            variant="tile"
            selected={true}
            size="lg"
            onClick={() => {}}
          />
          <MenuItem
            label="Large Size (Unselected)"
            prefix={<AccessTimeIcon />}
            variant="ghost"
            selected={false}
            size="lg"
            onClick={() => {}}
          />
        </Box>
      </Box>
    );
  },
};

const InteractiveComponent = () => {
  const [selected, setSelected] = React.useState('files');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '250px',
        padding: 2,
      }}
    >
      <MenuItem
        label="Files"
        prefix={<FolderIcon />}
        variant="tile"
        selected={selected === 'files'}
        onClick={() => setSelected('files')}
      />
      <MenuItem
        label="Recent"
        prefix={<AccessTimeIcon />}
        variant="ghost"
        selected={selected === 'recent'}
        onClick={() => setSelected('recent')}
      />
      <MenuItem
        label="Favorites"
        prefix={<FavoriteBorderIcon />}
        variant="ghost"
        selected={selected === 'favorites'}
        onClick={() => setSelected('favorites')}
      />
    </Box>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};
