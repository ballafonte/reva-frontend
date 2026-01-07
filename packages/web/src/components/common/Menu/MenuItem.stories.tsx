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
import { Contexts, ContextType } from '@reva-frontend/common/theme';

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
    onClick: () => {},
    prefix: <FolderIcon />,
    selected: true,
    suffix: <ExpandMoreIcon />,
    variant: 'tile',
  },
};

export const Tile: Story = {
  args: {
    label: 'All Files',
    onClick: () => {},
    prefix: <FolderIcon />,
    selected: true,
    suffix: <ExpandMoreIcon />,
    variant: 'tile',
  },
};

export const Contained: Story = {
  args: {
    label: 'Files',
    onClick: () => {},
    prefix: <FolderIcon />,
    selected: true,
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Files',
    onClick: () => {},
    prefix: <FolderIcon />,
    selected: true,
    variant: 'outlined',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Recent',
    onClick: () => {},
    prefix: <AccessTimeIcon />,
    selected: false,
    variant: 'ghost',
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
        onClick={() => {}}
        prefix={<FolderIcon />}
        suffix={<ExpandMoreIcon />}
        selected={true}
        variant="tile"
      />
      <MenuItem
        label="Recent"
        onClick={() => {}}
        prefix={<AccessTimeIcon />}
        selected={false}
        variant="ghost"
      />
      <MenuItem
        label="Favorites"
        onClick={() => {}}
        prefix={<FavoriteBorderIcon />}
        selected={false}
        variant="ghost"
      />
      <MenuItem
        label="Shared"
        onClick={() => {}}
        prefix={<ShareIcon />}
        selected={false}
        variant="ghost"
      />
      <MenuItem
        label="Tags"
        onClick={() => {}}
        prefix={<LabelIcon />}
        selected={false}
        variant="ghost"
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
          onClick={() => {}}
          prefix={<SettingsIcon />}
          selected={false}
          variant="ghost"
        />
        <MenuItem
          label="Deleted Files"
          onClick={() => {}}
          prefix={<DeleteIcon />}
          selected={false}
          variant="ghost"
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
        onClick={() => {}}
        prefix={<FolderIcon />}
        selected={true}
        variant="tile"
      />
      <MenuItem
        label="Activity"
        onClick={() => {}}
        prefix={<AccessTimeIcon />}
        selected={false}
        variant="ghost"
      />
      <MenuItem
        label="Calendar"
        onClick={() => {}}
        prefix={<LabelIcon />}
        selected={false}
        variant="ghost"
      />
      <MenuItem
        label="Contact"
        onClick={() => {}}
        prefix={<SettingsIcon />}
        selected={false}
        variant="ghost"
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
        onClick={() => {}}
        prefix={<FolderIcon />}
        selected={true}
        suffix={<ExpandMoreIcon />}
        variant="tile"
      />
      <MenuItem
        label="Item with Badge"
        onClick={() => {}}
        prefix={<FolderIcon />}
        selected={false}
        suffix={<Box sx={{ fontSize: '12px', color: 'inherit' }}>3</Box>}
        variant="ghost"
      />
      <MenuItem
        label="Item with Icon"
        onClick={() => {}}
        prefix={<FolderIcon />}
        selected={false}
        suffix={<SettingsIcon />}
        variant="ghost"
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
        onClick={() => {}}
        prefix={<FolderIcon />}
        selected={true}
        variant="tile"
      />
      <MenuItem
        disabled={true}
        label="Disabled Item"
        onClick={() => {}}
        prefix={<FolderIcon />}
        selected={false}
        variant="tile"
      />
      <MenuItem
        disabled={true}
        label="Disabled Selected"
        onClick={() => {}}
        prefix={<FolderIcon />}
        selected={true}
        variant="contained"
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
              onClick={() => {}}
              prefix={<FolderIcon />}
              variant="tile"
              selected={true}
              context={context}
            />
            <MenuItem
              label={`${context} (Unselected)`}
              onClick={() => {}}
              prefix={<FolderIcon />}
              selected={false}
              context={context}
              variant="tile"
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
            onClick={() => {}}
            prefix={<FolderIcon />}
            selected={true}
            size="sm"
            variant="tile"
          />
          <MenuItem
            label="Small Size (Unselected)"
            onClick={() => {}}
            prefix={<AccessTimeIcon />}
            selected={false}
            size="sm"
            variant="ghost"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MenuItem
            label="Medium Size (Default)"
            onClick={() => {}}
            prefix={<FolderIcon />}
            selected={true}
            size="md"
            variant="tile"
          />
          <MenuItem
            label="Medium Size (Unselected)"
            onClick={() => {}}
            prefix={<AccessTimeIcon />}
            selected={false}
            size="md"
            variant="ghost"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MenuItem
            label="Large Size"
            onClick={() => {}}
            prefix={<FolderIcon />}
            selected={true}
            size="lg"
            variant="tile"
          />
          <MenuItem
            label="Large Size (Unselected)"
            onClick={() => {}}
            prefix={<AccessTimeIcon />}
            selected={false}
            size="lg"
            variant="ghost"
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
        onClick={() => setSelected('files')}
        prefix={<FolderIcon />}
        selected={selected === 'files'}
        variant="tile"
      />
      <MenuItem
        label="Recent"
        onClick={() => setSelected('recent')}
        prefix={<AccessTimeIcon />}
        selected={selected === 'recent'}
        variant="ghost"
      />
      <MenuItem
        label="Favorites"
        onClick={() => setSelected('favorites')}
        prefix={<FavoriteBorderIcon />}
        selected={selected === 'favorites'}
        variant="ghost"
      />
    </Box>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};
