export const WHITESPACE = {
  none: 0,
  xsm: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xlg: 20,
} as const;

export type WhitespaceSize = keyof typeof WHITESPACE;

export type WhitespaceType = 'padding' | 'margin';

export type WhitespaceSide = 'top' | 'right' | 'bottom' | 'left';

export const getWhitespace = (
  type: WhitespaceType,
  side: WhitespaceSide,
  size: WhitespaceSize = 'md',
  multiple = 1
) => ({
  [`${type}${side.charAt(0).toUpperCase()}${side.slice(1)}`]:
    WHITESPACE[size] * multiple,
});

export const getWhitespaceX = (
  type: WhitespaceType,
  size: WhitespaceSize = 'md',
  multiple = 1
) => ({
  ...getWhitespace(type, 'left', size, multiple),
  ...getWhitespace(type, 'right', size, multiple),
});

export const getWhitespaceY = (
  type: WhitespaceType,
  size: WhitespaceSize = 'md',
  multiple = 1
) => ({
  ...getWhitespace(type, 'top', size, multiple),
  ...getWhitespace(type, 'bottom', size, multiple),
});

export const getWhitespaceSides = (
  type: WhitespaceType,
  size: WhitespaceSize = 'md',
  multiple = 1
) => ({
  ...getWhitespaceX(type, size, multiple),
  ...getWhitespaceY(type, size, multiple),
});
