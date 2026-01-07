import { ELEMENT_COLORS, WHITESPACE } from '@reva-frontend/common/theme';
import { SxProps, Theme } from '@mui/material';
import { ButtonProps } from './Button.types';

export const buttonStyles = ({
  size,
  variant,
  context,
  isLoading,
  muiVariant,
  sx,
}: ButtonProps & {
  muiVariant?: 'contained' | 'outlined' | 'text';
}): SxProps<Theme> => {
  // For the new 'text' variant, make it look like a link
  if (variant === 'text') {
    return {
      display: 'inline',
      padding: 0,
      minWidth: 'auto',
      width: 'auto', // Explicitly prevent fullWidth from affecting text variant
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

  // Base styles for other variants
  const borderRadius =
    size === 'small'
      ? WHITESPACE.sm
      : size === 'medium'
        ? WHITESPACE.sm
        : WHITESPACE.md;

  const baseStyles: SxProps<Theme> = {
    borderRadius: `${borderRadius}px`,
    ...sx,
  };

  // Apply active state styles when loading
  if (isLoading && muiVariant) {
    const loadingStyles: SxProps<Theme> = {
      ...baseStyles,
      // Use MUI's active state by applying the same styles as :active pseudo-class
      ...(muiVariant === 'contained' && {
        backgroundColor: (theme) => {
          // Access the color from theme.palette using the context
          // MUI handles the color prop, so we can use the same approach
          const paletteColor =
            context && context in theme.palette
              ? (theme.palette as any)[context]
              : theme.palette.primary;
          return paletteColor?.dark || theme.palette.primary.dark;
        },
        '&:hover': {
          backgroundColor: (theme) => {
            const paletteColor =
              context && context in theme.palette
                ? (theme.palette as any)[context]
                : theme.palette.primary;
            return paletteColor?.dark || theme.palette.primary.dark;
          },
        },
      }),
      ...(muiVariant === 'outlined' && {
        borderColor: (theme) => {
          const paletteColor =
            context && context in theme.palette
              ? (theme.palette as any)[context]
              : theme.palette.primary;
          return paletteColor?.main || theme.palette.primary.main;
        },
        backgroundColor: (theme) => {
          const paletteColor =
            context && context in theme.palette
              ? (theme.palette as any)[context]
              : theme.palette.primary;
          const mainColor = paletteColor?.main || theme.palette.primary.main;
          return theme.palette.mode === 'dark'
            ? `${mainColor}14`
            : `${mainColor}08`;
        },
        '&:hover': {
          borderColor: (theme) => {
            const paletteColor =
              context && context in theme.palette
                ? (theme.palette as any)[context]
                : theme.palette.primary;
            return paletteColor?.main || theme.palette.primary.main;
          },
          backgroundColor: (theme) => {
            const paletteColor =
              context && context in theme.palette
                ? (theme.palette as any)[context]
                : theme.palette.primary;
            const mainColor = paletteColor?.main || theme.palette.primary.main;
            return theme.palette.mode === 'dark'
              ? `${mainColor}14`
              : `${mainColor}08`;
          },
        },
      }),
      ...(muiVariant === 'text' && {
        backgroundColor: (theme) => {
          const paletteColor =
            context && context in theme.palette
              ? (theme.palette as any)[context]
              : theme.palette.primary;
          const mainColor = paletteColor?.main || theme.palette.primary.main;
          return theme.palette.mode === 'dark'
            ? `${mainColor}14`
            : `${mainColor}08`;
        },
        '&:hover': {
          backgroundColor: (theme) => {
            const paletteColor =
              context && context in theme.palette
                ? (theme.palette as any)[context]
                : theme.palette.primary;
            const mainColor = paletteColor?.main || theme.palette.primary.main;
            return theme.palette.mode === 'dark'
              ? `${mainColor}14`
              : `${mainColor}08`;
          },
        },
      }),
    };
    return loadingStyles;
  }

  return baseStyles;
};
