import {
  type BoxProps,
  type CircularProgressProps,
  type SxProps,
  type Theme,
} from '@mui/material';
import type { ContextType, Size } from '@reva-frontend/common';

export type ActivityIndicatorProps = CircularProgressProps & {
  containerProps?: BoxProps;
  context?: ContextType;
  size?: Size | number;
  sx?: SxProps<Theme>;
};
