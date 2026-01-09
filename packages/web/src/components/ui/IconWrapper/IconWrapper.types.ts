import type { SvgIconProps } from '@mui/material';
import type { Size, ContextType } from '@reva-frontend/common';

export type IconWrapperProps = Omit<SvgIconProps, 'fontSize'> & {
  context?: ContextType;
  component?: React.ElementType;
  children?: React.ReactNode;
  size?: Size | number;
};
