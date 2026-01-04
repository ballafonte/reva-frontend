import { WHITESPACE } from '@common/theme';
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

  const dimension = size
    ? typeof size === 'number'
      ? `${size}px`
      : size
    : 'auto';

  return {
    width: dimension,
    height: dimension,
    borderRadius: borderRadius,
    objectFit: 'cover',
    display: 'block',
  };
};
