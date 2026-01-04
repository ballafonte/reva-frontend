import { COLORS, ELEMENT_COLORS, WHITESPACE } from '@common/theme';
import { SxProps, Theme } from '@mui/material';
import { PanelProps } from './Panel.types';

export const panelStyles = ({
  variant = 'outlined',
  padding = true,
}: PanelProps): SxProps<Theme> => {
  const backgroundColor = variant === 'filled' ? COLORS.GRAY_100 : COLORS.WHITE;

  return {
    backgroundColor: backgroundColor,
    border:
      variant === 'outlined' ? `1px solid ${ELEMENT_COLORS.BORDER}` : 'none',
    ...(padding && {
      padding: `${WHITESPACE.md}px`,
    }),
  };
};
