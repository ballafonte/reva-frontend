import { IconButtonProps as MuiIconButtonProps } from '@mui/material';

export type IconButtonProps = MuiIconButtonProps & {
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  edge?: false | 'start' | 'end';
};
