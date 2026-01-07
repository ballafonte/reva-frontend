import {
  SIZE,
  Size,
  WHITESPACE,
  WhitespaceSize,
} from '@reva-frontend/common/theme';
import { SxProps, Theme } from '@mui/material';
import { ImageProps } from './Image.types';

export const imageStyles = ({
  variant = 'square',
  size,
}: Pick<ImageProps, 'variant' | 'size'>): SxProps<Theme> => {
  const borderRadius =
    variant === 'circle'
      ? '50%'
      : variant === 'rounded'
        ? `${WHITESPACE.sm}px`
        : '0';

  let dimension: string = 'auto';

  if (size !== undefined) {
    if (typeof size === 'number') {
      dimension = `${size}px`;
    } else if (typeof size === 'string' && size in SIZE) {
      // It's a SIZE token (e.g., 'md', 'sm', etc.)
      dimension = `${SIZE[size as Size]}px`;
    } else if (typeof size === 'string' && size in WHITESPACE) {
      // It's a WHITESPACE token (e.g., 'md', 'sm', etc.) - multiply by 2
      dimension = `${WHITESPACE[size as WhitespaceSize] * 2}px`;
    } else {
      // It's a custom CSS value (e.g., '100px', '50%', etc.)
      dimension = size;
    }
  }

  return {
    width: dimension,
    height: dimension,
    borderRadius: borderRadius,
    objectFit: 'cover',
    display: 'block',
  };
};
