import { CONTEXT_COLORS, WHITESPACE } from '@common/theme';
import { ContextType } from '@common/theme';
import { SxProps, Theme } from '@mui/material';
import { TagProps } from './Tag.types';

export const tagStyles = ({
  context = 'primary',
  size = 'medium',
  variant = 'filled',
}: Pick<TagProps, 'context' | 'size' | 'variant'>): SxProps<Theme> => {
  const contextColor =
    CONTEXT_COLORS[context as ContextType] || CONTEXT_COLORS.primary;
  const padding =
    size === 'small'
      ? `${WHITESPACE.xsm}px ${WHITESPACE.sm}px`
      : `${WHITESPACE.sm}px ${WHITESPACE.md}px`;
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
