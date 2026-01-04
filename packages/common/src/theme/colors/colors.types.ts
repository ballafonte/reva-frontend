import { CONTEXT_COLORS, THEME_COLORS } from './colors.constants';

type ThemeColorsKeys = keyof typeof THEME_COLORS;

export type ThemeColorsType = (typeof THEME_COLORS)[ThemeColorsKeys];

type ContextColorsKeys = keyof typeof CONTEXT_COLORS;

export type ContextColorsType = (typeof CONTEXT_COLORS)[ContextColorsKeys];
