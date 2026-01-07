export const SIZE = {
  xsm: 12,
  sm: 24,
  md: 36,
  lg: 48,
  xlg: 60,
} as const;

export type Size = keyof typeof SIZE;
