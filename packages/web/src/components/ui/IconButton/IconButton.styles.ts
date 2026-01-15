import {
  COLORS,
  SIZE,
  Size,
  WHITESPACE,
  WhitespaceSize,
} from '@reva-frontend/common/theme';
import { SxProps, Theme } from '@mui/material';
import { IconButtonProps } from './IconButton.types';

export const iconButtonStyles = ({
  size = 'sm',
  circular = false,
  padding = 'xsm',
  variant = 'ghost',
  context,
}: Pick<
  IconButtonProps,
  'size' | 'circular' | 'padding' | 'variant' | 'context'
>): SxProps<Theme> => {
  const paddingValue = WHITESPACE[padding as WhitespaceSize];

  const baseStyles: SxProps<Theme> & Record<string, any> = {
    borderRadius: circular ? '50%' : `${WHITESPACE.sm}px`,
    padding: `${paddingValue}px`,
  };

  // Apply variant-specific styles
  if (variant === 'contained') {
    baseStyles.backgroundColor = (theme: Theme) => {
      const paletteColor =
        context && context in theme.palette
          ? (theme.palette as any)[context]
          : theme.palette.primary;
      return paletteColor?.main || theme.palette.primary.main;
    };
    baseStyles.color = (theme: Theme) => {
      const paletteColor =
        context && context in theme.palette
          ? (theme.palette as any)[context]
          : theme.palette.primary;
      return paletteColor?.contrastText || theme.palette.primary.contrastText;
    };
    baseStyles['&:hover'] = {
      backgroundColor: (theme: Theme) => {
        const paletteColor =
          context && context in theme.palette
            ? (theme.palette as any)[context]
            : theme.palette.primary;
        return paletteColor?.dark || theme.palette.primary.dark;
      },
    };
    baseStyles['&:active'] = {
      backgroundColor: (theme: Theme) => {
        const paletteColor =
          context && context in theme.palette
            ? (theme.palette as any)[context]
            : theme.palette.primary;
        return paletteColor?.dark || theme.palette.primary.dark;
      },
    };
  } else if (variant === 'outlined') {
    baseStyles.border = (theme: Theme) => {
      const paletteColor =
        context && context in theme.palette
          ? (theme.palette as any)[context]
          : theme.palette.primary;
      return `1px solid ${paletteColor?.main || theme.palette.primary.main}`;
    };
    baseStyles.backgroundColor = 'transparent';
    baseStyles.color = (theme: Theme) => {
      const paletteColor =
        context && context in theme.palette
          ? (theme.palette as any)[context]
          : theme.palette.primary;
      return paletteColor?.main || theme.palette.primary.main;
    };
    baseStyles['&:hover'] = {
      backgroundColor: (theme: Theme) => {
        const paletteColor =
          context && context in theme.palette
            ? (theme.palette as any)[context]
            : theme.palette.primary;
        const mainColor = paletteColor?.main || theme.palette.primary.main;
        return theme.palette.mode === 'dark'
          ? `${mainColor}14`
          : `${mainColor}08`;
      },
      borderColor: (theme: Theme) => {
        const paletteColor =
          context && context in theme.palette
            ? (theme.palette as any)[context]
            : theme.palette.primary;
        return paletteColor?.main || theme.palette.primary.main;
      },
    };
    baseStyles['&:active'] = {
      backgroundColor: (theme: Theme) => {
        const paletteColor =
          context && context in theme.palette
            ? (theme.palette as any)[context]
            : theme.palette.primary;
        const mainColor = paletteColor?.main || theme.palette.primary.main;
        return theme.palette.mode === 'dark'
          ? `${mainColor}1F`
          : `${mainColor}14`;
      },
    };
  } else if (variant === 'text') {
    baseStyles.backgroundColor = 'transparent';
    baseStyles.color = (theme: Theme) => {
      const paletteColor =
        context && context in theme.palette
          ? (theme.palette as any)[context]
          : theme.palette.primary;
      return paletteColor?.main || theme.palette.primary.main;
    };
    baseStyles['&:hover'] = {
      backgroundColor: (theme: Theme) => {
        const paletteColor =
          context && context in theme.palette
            ? (theme.palette as any)[context]
            : theme.palette.primary;
        const mainColor = paletteColor?.main || theme.palette.primary.main;
        return theme.palette.mode === 'dark'
          ? `${mainColor}14`
          : `${mainColor}08`;
      },
    };
    baseStyles['&:active'] = {
      backgroundColor: (theme: Theme) => {
        const paletteColor =
          context && context in theme.palette
            ? (theme.palette as any)[context]
            : theme.palette.primary;
        const mainColor = paletteColor?.main || theme.palette.primary.main;
        return theme.palette.mode === 'dark'
          ? `${mainColor}1F`
          : `${mainColor}14`;
      },
    };
  } else {
    // 'ghost' variant (default) - minimal styling
    baseStyles.backgroundColor = 'transparent';
    baseStyles['&:hover'] = {
      backgroundColor: COLORS.GRAY_100,
    };
    baseStyles['&:active'] = {
      backgroundColor: COLORS.GRAY_200,
    };
  }

  let buttonSize: number;
  if (typeof size === 'string' && size in SIZE) {
    // It's a SIZE token (e.g., 'md', 'sm', etc.)
    buttonSize = SIZE[size as Size];
  } else if (typeof size === 'number') {
    // It's a number in pixels
    buttonSize = size;
  } else {
    return baseStyles;
  }

  // Set width and height based on size, including padding
  baseStyles.width = 'auto';
  baseStyles.height = 'auto';
  baseStyles.minWidth = `${buttonSize + paddingValue * 2}px`;
  baseStyles.minHeight = `${buttonSize + paddingValue * 2}px`;

  return baseStyles;
};
