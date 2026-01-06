export const FONT_SIZE_BASE = 16;

export const FONT_SIZES = {
  xsm: 0.8 * FONT_SIZE_BASE,
  sm: 0.875 * FONT_SIZE_BASE,
  md: 1 * FONT_SIZE_BASE,
  lg: 1.25 * FONT_SIZE_BASE,
  xlg: 1.5 * FONT_SIZE_BASE,
  xxl: 1.75 * FONT_SIZE_BASE,
  xl3: 2 * FONT_SIZE_BASE,
  xl4: 2.5 * FONT_SIZE_BASE,
} as const;

export type FontSizeType = keyof typeof FONT_SIZES;

export const COMPONENT_FONT_SIZES = {
  H1: FONT_SIZES.xl4,
  H2: FONT_SIZES.xl3,
  H3: FONT_SIZES.xxl,
  H4: FONT_SIZES.xlg,
  H5: FONT_SIZES.lg,
  H6: FONT_SIZES.md,
  INPUT: FONT_SIZES.md,
  TEXT: FONT_SIZES.sm,
  SMALL: FONT_SIZES.xsm,
} as const;

export type ComponentFontSizeType = keyof typeof COMPONENT_FONT_SIZES;

export const FONT_WEIGHTS = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

export type FontWeightType = keyof typeof FONT_WEIGHTS;

export const FONT_DECORATIONS = {
  OVERFLOW_ELLIPSIS: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
} as const;

export const TEXT_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
  START: 'start',
  END: 'end',
} as const;

export const LINE_HEIGHTS = {
  narrow: 1.2,
  normal: 1.5,
  wide: 2,
} as const;

export type LineHeightType = keyof typeof LINE_HEIGHTS;

export const getLineHeight = (
  fontSize: number | FontSizeType,
  lineHeight?: LineHeightType
) => {
  const fontSizeValue =
    typeof fontSize === 'number' ? fontSize : FONT_SIZES[fontSize];
  const lineHeightValue = lineHeight
    ? LINE_HEIGHTS[lineHeight]
    : LINE_HEIGHTS.normal;
  return fontSizeValue * lineHeightValue;
};

export const parseLineHeightProp = (
  lineHeightProp?: LineHeightType | number,
  fontSizeProp?: number | FontSizeType
) => {
  if (typeof lineHeightProp === 'number') {
    return lineHeightProp;
  } else if (fontSizeProp) {
    return getLineHeight(fontSizeProp, lineHeightProp);
  }
  return undefined;
};
