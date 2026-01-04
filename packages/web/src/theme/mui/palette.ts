import { PaletteOptions } from '@mui/material/styles';
import {
  COLORS,
  THEME_COLORS,
  SEVERITY_COLORS,
  ELEMENT_COLORS,
  ThemeContexts,
  SeverityContexts,
  getLightContextColor,
  getDarkContextColor,
} from '@reva-frontend/common';

export const palette: PaletteOptions = {
  mode: 'light',

  primary: {
    main: THEME_COLORS[ThemeContexts.PRIMARY].base,
    light: getLightContextColor(ThemeContexts.PRIMARY),
    dark: getDarkContextColor(ThemeContexts.PRIMARY),
    contrastText: THEME_COLORS[ThemeContexts.PRIMARY].contrast,
  },

  secondary: {
    main: THEME_COLORS[ThemeContexts.SECONDARY].base,
    light: getLightContextColor(ThemeContexts.SECONDARY),
    dark: getDarkContextColor(ThemeContexts.SECONDARY),
    contrastText: THEME_COLORS[ThemeContexts.SECONDARY].contrast,
  },

  success: {
    main: SEVERITY_COLORS[SeverityContexts.SUCCESS].base,
    light: getLightContextColor(SeverityContexts.SUCCESS),
    dark: getDarkContextColor(SeverityContexts.SUCCESS),
    contrastText: SEVERITY_COLORS[SeverityContexts.SUCCESS].contrast,
  },

  warning: {
    main: SEVERITY_COLORS[SeverityContexts.WARNING].base,
    light: getLightContextColor(SeverityContexts.WARNING),
    dark: getDarkContextColor(SeverityContexts.WARNING),
    contrastText: SEVERITY_COLORS[SeverityContexts.WARNING].contrast,
  },

  danger: {
    main: SEVERITY_COLORS[SeverityContexts.DANGER].base,
    light: getLightContextColor(SeverityContexts.DANGER),
    dark: getDarkContextColor(SeverityContexts.DANGER),
    contrastText: SEVERITY_COLORS[SeverityContexts.DANGER].contrast,
  },

  // Keep error as alias to danger for backward compatibility
  error: {
    main: SEVERITY_COLORS[SeverityContexts.DANGER].base,
    light: getLightContextColor(SeverityContexts.DANGER),
    dark: getDarkContextColor(SeverityContexts.DANGER),
    contrastText: SEVERITY_COLORS[SeverityContexts.DANGER].contrast,
  },

  info: {
    main: SEVERITY_COLORS[SeverityContexts.INFO].base,
    light: getLightContextColor(SeverityContexts.INFO),
    dark: getDarkContextColor(SeverityContexts.INFO),
    contrastText: SEVERITY_COLORS[SeverityContexts.INFO].contrast,
  },

  // Additional theme context colors
  tertiary: {
    main: THEME_COLORS[ThemeContexts.TERTIARY].base,
    light: getLightContextColor(ThemeContexts.TERTIARY),
    dark: getDarkContextColor(ThemeContexts.TERTIARY),
    contrastText: THEME_COLORS[ThemeContexts.TERTIARY].contrast,
  },

  // Additional severity context colors
  plain: {
    main: SEVERITY_COLORS[SeverityContexts.PLAIN].base,
    light: getLightContextColor(SeverityContexts.PLAIN),
    dark: getDarkContextColor(SeverityContexts.PLAIN),
    contrastText: SEVERITY_COLORS[SeverityContexts.PLAIN].contrast,
  },

  muted: {
    main: SEVERITY_COLORS[SeverityContexts.MUTED].base,
    light: getLightContextColor(SeverityContexts.MUTED),
    dark: getDarkContextColor(SeverityContexts.MUTED),
    contrastText: SEVERITY_COLORS[SeverityContexts.MUTED].contrast,
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
    [ThemeContexts.TERTIARY]: THEME_COLORS[ThemeContexts.TERTIARY],
  },

  severityContext: {
    [SeverityContexts.SUCCESS]: SEVERITY_COLORS[SeverityContexts.SUCCESS],
    [SeverityContexts.WARNING]: SEVERITY_COLORS[SeverityContexts.WARNING],
    [SeverityContexts.DANGER]: SEVERITY_COLORS[SeverityContexts.DANGER],
    [SeverityContexts.INFO]: SEVERITY_COLORS[SeverityContexts.INFO],
    [SeverityContexts.PLAIN]: SEVERITY_COLORS[SeverityContexts.PLAIN],
    [SeverityContexts.MUTED]: SEVERITY_COLORS[SeverityContexts.MUTED],
  },
};
