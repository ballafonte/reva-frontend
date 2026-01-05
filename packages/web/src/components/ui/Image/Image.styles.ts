import { WHITESPACE, WhitespaceSize } from '@common/theme';
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
    } else if (typeof size === 'string' && size in WHITESPACE) {
      dimension = `${WHITESPACE[size as WhitespaceSize] * 4}px`;
    } else {
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
