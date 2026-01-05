import { Size, WhitespaceSize } from '@common/theme';
import { IconButtonProps as MuiIconButtonProps } from '@mui/material';

export type IconButtonProps = Omit<MuiIconButtonProps, 'size'> & {
  onClick: () => void;
  size?: Size | number;
  circular?: boolean;
  padding?: WhitespaceSize;
  edge?: false | 'start' | 'end';
};
