import { ListItemProps as MuiListItemProps } from '@mui/material';

export type ListItemProps = MuiListItemProps & {
  selected?: boolean;
  disabled?: boolean;
};
