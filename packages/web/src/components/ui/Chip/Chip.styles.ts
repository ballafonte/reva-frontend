import { CONTEXT_COLORS, WHITESPACE } from '@common/theme';
import { ContextType } from '@common/theme';
import { SxProps, Theme } from '@mui/material';
import { ChipProps } from './Chip.types';

export const chipStyles = ({
  context = 'primary',
  size = 'medium',
  variant = 'filled',
}: Pick<ChipProps, 'context' | 'size' | 'variant'>): SxProps<Theme> => {
  const contextColor =
    CONTEXT_COLORS[context as ContextType] || CONTEXT_COLORS.primary;
  const padding =
    size === 'small'
      ? `${WHITESPACE.xsm}px ${WHITESPACE.xsm}px`
      : `${WHITESPACE.sm}px ${WHITESPACE.sm}px`;
  const fontSize = size === 'small' ? '12px' : '14px';

  if (variant === 'outlined') {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      padding: padding,
      borderRadius: `${WHITESPACE.lg}px`,
      border: `1px solid ${contextColor.base}`,
      backgroundColor: 'transparent',
      color: contextColor.base,
      fontSize: fontSize,
      fontWeight: 500,
    };
  }

  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: padding,
    borderRadius: `${WHITESPACE.lg}px`,
    backgroundColor: contextColor.base,
    color: contextColor.contrast,
    fontSize: fontSize,
    fontWeight: 500,
  };
};
