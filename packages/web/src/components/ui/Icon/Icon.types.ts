import { SvgIconProps } from '@mui/material';

export type IconProps = SvgIconProps & {
  component?: React.ElementType;
  children?: React.ReactNode;
};
