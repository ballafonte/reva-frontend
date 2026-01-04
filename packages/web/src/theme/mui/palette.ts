import { PaletteOptions } from '@mui/material/styles';
import {
  COLORS,
  THEME_COLORS,
  CONTEXT_COLORS,
  ELEMENT_COLORS,
  ThemeContexts,
  SeverityContexts,
} from '@reva-frontend/common';

export const palette: PaletteOptions = {
  mode: 'light',

  primary: {
    main: THEME_COLORS[ThemeContexts.PRIMARY].base,
    contrastText: THEME_COLORS[ThemeContexts.PRIMARY].contrast,
  },

  secondary: {
    main: THEME_COLORS[ThemeContexts.SECONDARY].base,
    contrastText: THEME_COLORS[ThemeContexts.SECONDARY].contrast,
  },

  success: {
    main: CONTEXT_COLORS[SeverityContexts.SUCCESS].base,
    contrastText: CONTEXT_COLORS[SeverityContexts.SUCCESS].contrast,
  },

  warning: {
    main: CONTEXT_COLORS[SeverityContexts.WARNING].base,
    contrastText: CONTEXT_COLORS[SeverityContexts.WARNING].contrast,
  },

  error: {
    main: CONTEXT_COLORS[SeverityContexts.DANGER].base,
    contrastText: CONTEXT_COLORS[SeverityContexts.DANGER].contrast,
  },

  info: {
    main: CONTEXT_COLORS[SeverityContexts.INFO].base,
    contrastText: CONTEXT_COLORS[SeverityContexts.INFO].contrast,
  },

  // Additional theme context colors
  highlight: {
    main: THEME_COLORS[ThemeContexts.HIGHLIGHT].base,
    contrastText: THEME_COLORS[ThemeContexts.HIGHLIGHT].contrast,
  },

  promotion: {
    main: THEME_COLORS[ThemeContexts.PROMOTION].base,
    contrastText: THEME_COLORS[ThemeContexts.PROMOTION].contrast,
  },

  // Additional severity context colors
  plain: {
    main: CONTEXT_COLORS[SeverityContexts.PLAIN].base,
    contrastText: CONTEXT_COLORS[SeverityContexts.PLAIN].contrast,
  },

  muted: {
    main: CONTEXT_COLORS[SeverityContexts.MUTED].base,
    contrastText: CONTEXT_COLORS[SeverityContexts.MUTED].contrast,
  },

  grey: {
    100: COLORS.GRAY_100,
    200: COLORS.GRAY_200,
    300: COLORS.GRAY_300,
    400: COLORS.GRAY_400,
    500: COLORS.GRAY_500,
    600: COLORS.GRAY_600,
    700: COLORS.GRAY_700,
    800: COLORS.GRAY_800,
    900: COLORS.GRAY_900,
  },

  text: {
    primary: ELEMENT_COLORS.TEXT,
    secondary: COLORS.GRAY_600,
  },

  background: {
    default: ELEMENT_COLORS.BODY,
    paper: ELEMENT_COLORS.BACKGROUND,
  },

  divider: ELEMENT_COLORS.BORDER,

  // Custom context colors for theme and severity contexts
  themeContext: {
    [ThemeContexts.PRIMARY]: THEME_COLORS[ThemeContexts.PRIMARY],
    [ThemeContexts.SECONDARY]: THEME_COLORS[ThemeContexts.SECONDARY],
    [ThemeContexts.HIGHLIGHT]: THEME_COLORS[ThemeContexts.HIGHLIGHT],
    [ThemeContexts.PROMOTION]: THEME_COLORS[ThemeContexts.PROMOTION],
  },

  severityContext: {
    [SeverityContexts.SUCCESS]: CONTEXT_COLORS[SeverityContexts.SUCCESS],
    [SeverityContexts.WARNING]: CONTEXT_COLORS[SeverityContexts.WARNING],
    [SeverityContexts.DANGER]: CONTEXT_COLORS[SeverityContexts.DANGER],
    [SeverityContexts.INFO]: CONTEXT_COLORS[SeverityContexts.INFO],
    [SeverityContexts.PLAIN]: CONTEXT_COLORS[SeverityContexts.PLAIN],
    [SeverityContexts.MUTED]: CONTEXT_COLORS[SeverityContexts.MUTED],
  },
};
