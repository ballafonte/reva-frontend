import { SIZE, Size } from '@common/theme';
import { SxProps, Theme } from '@mui/material';
import { IconProps } from './Icon.types';

export const iconStyles = ({
  size,
}: Pick<IconProps, 'size'>): SxProps<Theme> => {
  const baseStyles: SxProps<Theme> = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (size !== undefined) {
    if (typeof size === 'string' && size in SIZE) {
      // It's a SIZE token (e.g., 'md', 'sm', etc.)
      baseStyles.fontSize = `${SIZE[size as Size]}px`;
    } else if (typeof size === 'number') {
      // It's a number in pixels
      baseStyles.fontSize = `${size}px`;
    }
  }

  return baseStyles;
};
