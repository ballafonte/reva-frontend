export const SIZE = {
  xsm: 16,
  sm: 32,
  md: 48,
  lg: 64,
  xlg: 80,
} as const;

export type Size = keyof typeof SIZE;
