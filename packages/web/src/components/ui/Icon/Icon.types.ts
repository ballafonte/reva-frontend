import { Size } from '@common/theme';
import { SvgIconProps } from '@mui/material';

export type IconProps = Omit<SvgIconProps, 'fontSize'> & {
  component?: React.ElementType;
  children?: React.ReactNode;
  size?: Size | number;
};
