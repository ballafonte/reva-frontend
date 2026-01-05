import { ELEMENT_COLORS, WHITESPACE } from '@common/theme';
import { SxProps, Theme } from '@mui/material';
import { ButtonProps } from './Button.types';

export const buttonStyles = ({
  size,
  variant,
  context,
}: ButtonProps): SxProps<Theme> => {
  // For the new 'text' variant, make it look like a link
  if (variant === 'text') {
    return {
      display: 'inline',
      padding: 0,
      minWidth: 'auto',
      textTransform: 'none',
      fontSize: 'inherit',
      textDecoration: 'none',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      verticalAlign: 'unset',
      // Use context color if provided, otherwise use default link color
      color: context ? undefined : ELEMENT_COLORS.LINK,
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
        boxShadow: 'none',
      },
      '&:active': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
      '&:focus': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    };
  }

  // For other variants, apply border radius
  const borderRadius =
    size === 'small'
      ? WHITESPACE.sm
      : size === 'medium'
        ? WHITESPACE.sm
        : WHITESPACE.md;

  return {
    borderRadius: `${borderRadius}px`,
  };
};
