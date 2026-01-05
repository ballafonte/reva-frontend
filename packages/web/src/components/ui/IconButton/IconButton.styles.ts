import { COLORS, SIZE, Size, WHITESPACE, WhitespaceSize } from '@common/theme';
import { SxProps, Theme } from '@mui/material';
import { IconButtonProps } from './IconButton.types';

export const iconButtonStyles = ({
  size,
  circular = false,
  padding = 'md',
}: Pick<IconButtonProps, 'size' | 'circular' | 'padding'>): SxProps<Theme> => {
  const paddingValue = WHITESPACE[padding as WhitespaceSize];

  const baseStyles: SxProps<Theme> = {
    borderRadius: circular ? '50%' : `${WHITESPACE.sm}px`,
    padding: `${paddingValue}px`,
    '&:hover': {
      backgroundColor: COLORS.GRAY_100,
    },
    '&:active': {
      backgroundColor: COLORS.GRAY_200,
    },
  };

  if (size !== undefined) {
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
  }

  return baseStyles;
};
