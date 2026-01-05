import { SIZE, Size } from '@common/theme';
import { SxProps, Theme } from '@mui/material';
import { IconWrapperProps } from './IconWrapper.types';

export const iconWrapperStyles = ({
  size = 'sm',
}: Pick<IconWrapperProps, 'size'>): SxProps<Theme> => {
  const baseStyles: SxProps<Theme> = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (typeof size === 'string' && size in SIZE) {
    // It's a SIZE token (e.g., 'md', 'sm', etc.)
    baseStyles.fontSize = `${SIZE[size as Size]}px`;
  } else if (typeof size === 'number') {
    // It's a number in pixels
    baseStyles.fontSize = `${size}px`;
  }

  return baseStyles;
};
