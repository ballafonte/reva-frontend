import { WHITESPACE } from './whitespace';

export const IMAGE_SIZE = {
  none: 0,
  xsm: 20,
  sm: 40,
  md: 80,
  lg: 120,
  xlg: 160,
  max: '100%',
} as const;

export type ImageSize = keyof typeof IMAGE_SIZE;

export const getImageSize = (size: ImageSize | number, factor?: number) => {
  const f = factor ?? 1;
  if (typeof size === 'number') {
    return size * f;
  } else if (size === 'max') {
    return IMAGE_SIZE['xlg'] * f;
  }
  return IMAGE_SIZE[size] * f;
};

export const getImageWhitespace = (
  size: ImageSize | number,
  factor?: number
) => {
  const f = factor ?? 1;
  if (typeof size === 'number') return size * f;
  switch (size) {
    case 'none':
      return 0;
    case 'xsm':
      return 1 * f;
    case 'sm':
    case 'md':
      return WHITESPACE.xsm * f;
    case 'lg':
    case 'xlg':
    case 'max':
      return WHITESPACE.sm * f;
    default:
      return 0;
  }
};
