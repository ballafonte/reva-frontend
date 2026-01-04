import {
  CONTEXT_COLORS,
  THEME_COLORS,
  SeverityContexts,
  SeverityContextType,
  ThemeContexts,
  ThemeContextType,
  WHITESPACE,
} from '@common/theme';
import { css } from '@emotion/react';
import { ButtonContext } from './Button.types';

const getColorFromContext = (context: ButtonContext) => {
  if (
    Object.values(SeverityContexts).includes(context as SeverityContextType)
  ) {
    return CONTEXT_COLORS[context as SeverityContextType];
  }
  if (Object.values(ThemeContexts).includes(context as ThemeContextType)) {
    return THEME_COLORS[context as ThemeContextType];
  }
};

export const buttonStyles = {
  borderRadius: WHITESPACE.sm,
} as const;
