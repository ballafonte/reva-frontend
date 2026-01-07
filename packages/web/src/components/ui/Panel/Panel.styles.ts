import {
  COLORS,
  ELEMENT_COLORS,
  WHITESPACE,
} from '@reva-frontend/common/theme';
import { SxProps, Theme } from '@mui/material';
import { PanelProps } from './Panel.types';

export const panelStyles = ({
  padding,
  sx,
  variant = 'outlined',
}: PanelProps): SxProps<Theme> => {
  const backgroundColor = variant === 'filled' ? COLORS.GRAY_100 : COLORS.WHITE;

  return {
    backgroundColor: backgroundColor,
    border:
      variant === 'outlined' ? `1px solid ${ELEMENT_COLORS.BORDER}` : 'none',
    borderRadius: `${WHITESPACE.md}px`,
    padding: padding ? `${WHITESPACE[padding]}px` : `${WHITESPACE.lg}px`,
    ...sx,
  };
};
