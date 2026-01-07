import { Size } from '@reva-frontend/common/theme';
import { SvgIconProps } from '@mui/material';

export type IconWrapperProps = Omit<SvgIconProps, 'fontSize'> & {
  component?: React.ElementType;
  children?: React.ReactNode;
  size?: Size | number;
};
