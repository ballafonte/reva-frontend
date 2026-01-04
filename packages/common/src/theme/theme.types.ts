export type ColorContextType<T> = {
  ambience?: 'light' | 'dark';
  name: T;
};

export const ThemeContexts = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACTION: 'action',
  PROMOTION: 'promotion',
} as const;

type ThemeContextKeys = keyof typeof ThemeContexts;

export type ThemeContextType = (typeof ThemeContexts)[ThemeContextKeys];

export const SeverityContexts = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
  PLAIN: 'plain',
  MUTED: 'muted',
} as const;

type SeverityContextKeys = keyof typeof SeverityContexts;

export type SeverityContextType =
  (typeof SeverityContexts)[SeverityContextKeys];

export const ElementStates = {
  DEFAULT: 'default',
  HOVER: 'hover',
  FOCUS: 'focus',
  ACTIVE: 'active',
  DISABLED: 'disabled',
} as const;

type ElementStateKeys = keyof typeof ElementStates;

export type ElementStateType = (typeof ElementStates)[ElementStateKeys];

/**
 * For elements that can be checked--i.e. input[type="checkbox"] and input[type="radio"].
 */
export const CheckedElementStates = {
  ...ElementStates,
  CHECKED: 'checked',
} as const;

type CheckedElementStateKeys = keyof typeof CheckedElementStates;

export type CheckedElementStateType =
  (typeof CheckedElementStates)[CheckedElementStateKeys];
