import { ThemeContexts, SeverityContexts } from '../theme.types';

export type RgbColorType = {
  r: number;
  g: number;
  b: number;
};

export type HexColorType = string;

export const COLORS = {
  BLUE: '#0D6EFD',
  INDIGO: '#5a3fc0',
  PURPLE: '#6F42C1',
  PINK: '#d63384',
  RED: '#dc3545',
  ORANGE: '#FD7E14',
  YELLOW: '#f8e29f',
  GREEN: '#198754',
  TEAL: '#20C997',
  CYAN: '#0DCAF0',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: '#7E8299',
  GRAY_100: '#F9F9F9',
  GRAY_200: '#EFEFF0',
  GRAY_300: '#E1E3EA',
  GRAY_400: '#B5B5C3',
  GRAY_500: '#A1A5B7',
  GRAY_600: '#7E8299',
  GRAY_700: '#5E6278',
  GRAY_800: '#3F4254',
  GRAY_900: '#181C32',
} as const;

export const THEME_COLORS = {
  [ThemeContexts.PRIMARY]: {
    base: '#00b6dd',
    contrast: '#FFFFFF',
    text: '#005f73',
  },
  [ThemeContexts.SECONDARY]: {
    base: '#e7e6e6',
    contrast: '#3F4254',
    text: '#7E8299',
  },
  [ThemeContexts.TERTIARY]: {
    base: '#ED7D31',
    contrast: '#FFFFFF',
    text: '#B35A1F',
  },
} as const;

export const SEVERITY_COLORS = {
  [SeverityContexts.SUCCESS]: {
    base: '#50CD89',
    contrast: COLORS.WHITE,
    text: '#146c43',
  },
  [SeverityContexts.WARNING]: {
    base: COLORS.YELLOW,
    contrast: COLORS.BLACK,
    text: '#997404',
  },
  [SeverityContexts.DANGER]: {
    base: COLORS.RED,
    contrast: COLORS.WHITE,
    text: '#b02a37',
  },
  [SeverityContexts.INFO]: {
    base: COLORS.BLUE,
    contrast: COLORS.WHITE,
    text: '#0a58ca',
  },
  [SeverityContexts.PLAIN]: {
    base: COLORS.GRAY_300,
    contrast: COLORS.GRAY_900,
    text: COLORS.GRAY_700,
  },
} as const;

export const CONTEXT_COLORS = {
  ...THEME_COLORS,
  ...SEVERITY_COLORS,
} as const;

export const DARK_CONTEXT_COLOR_FACTOR = 0.65;

export const LIGHT_CONTEXT_COLOR_FACTOR = 0.94;

export const ELEMENT_COLORS = {
  TEXT: COLORS.GRAY_900,
  BORDER: COLORS.GRAY_300,
  BACKGROUND: COLORS.WHITE,
  BODY: '#F4F6FA',
  BOX_SHADOW: '#523F69',
  CODE: '#B93993',
  LINK: SEVERITY_COLORS[SeverityContexts.INFO].text,
} as const;

/**
 * A regular expression to match rgb-formatted color strings
 */
export const RGB_REGEX =
  /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
