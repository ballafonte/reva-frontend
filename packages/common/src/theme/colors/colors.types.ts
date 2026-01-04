import {
  CONTEXT_COLORS,
  SEVERITY_COLORS,
  THEME_COLORS,
} from './colors.constants';

type ThemeColorsKeys = keyof typeof THEME_COLORS;

export type ThemeColorsType = (typeof THEME_COLORS)[ThemeColorsKeys];

type SeverityColorsKeys = keyof typeof SEVERITY_COLORS;

export type SeverityColorsType = (typeof SEVERITY_COLORS)[SeverityColorsKeys];

type ContextColorsKeys = keyof typeof CONTEXT_COLORS;

export type ContextColorsType = (typeof CONTEXT_COLORS)[ContextColorsKeys];
