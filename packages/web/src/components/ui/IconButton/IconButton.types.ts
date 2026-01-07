import { ContextType, Size, WhitespaceSize } from '@reva-frontend/common/theme';
import { IconButtonProps as MuiIconButtonProps } from '@mui/material';

export type IconButtonProps = Omit<
  MuiIconButtonProps,
  'size' | 'children' | 'color'
> & {
  onClick: () => void;
  component: any; // Icon component from @mui/icons-material
  size?: Size | number;
  circular?: boolean;
  padding?: WhitespaceSize;
  edge?: false | 'start' | 'end';
  context?: ContextType;
  variant?: 'contained' | 'outlined' | 'ghost' | 'text';
};
