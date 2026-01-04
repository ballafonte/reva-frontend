import { ContextType } from '../theme.types';
import {
  RGB_REGEX,
  SEVERITY_COLORS,
  DARK_CONTEXT_COLOR_FACTOR,
  LIGHT_CONTEXT_COLOR_FACTOR,
  COLORS,
  CONTEXT_COLORS,
} from './colors.constants';
import { ContextColorsType } from './colors.types';

/**
 * @link https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param r the red value
 * @param g the green value
 * @param b the blue value
 * @returns the converted hex code
 */
export const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

/**
 * @link https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param hex the color hexacode
 * @returns an object with `r` (red), `g` (green), and `b` (blue) properties
 */
export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * @param hex the color hexacode
 * @returns a string with `r` (red), `g` (green), and `b` (blue) properties. Example: `'255, 255, 255'`
 */
export const hexToRgbString = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
};

/**
 * Check if a color is in rgb format (h/t - Google AI Overview)
 * @param color the color string to check
 * @returns whether the color is in rgb format
 */
export const isRgb = (color: string) => {
  const rgbRegex = RGB_REGEX;
  return rgbRegex.test(color);
};

/**
 * Parses an rgb color string into an object (h/t - Copilot)
 * @param rgb the rgb color string
 */
export const parseRgb = (rgb: string) => {
  const match = rgb.match(RGB_REGEX);
  if (!match) return null;
  const [, r, g, b] = match;
  return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
};

/**
 * Check if a color is in rgb format, and if so, parse it (h/t - Copilot)
 * @param color the color string to check
 * @returns the parsed rgb color object
 */
export const checkAndParseRgb = (color: string) => {
  return isRgb(color) ? parseRgb(color) : hexToRgb(color);
};

/**
 * A function to change a color's opacity (h/t - Copilot)
 */
export const getTransluscentColor = (color: string, opacity: number) => {
  const { r, g, b } = checkAndParseRgb(color) || {};
  if (r === undefined || g === undefined || b === undefined) return color;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Calculates best font color (white or black) to use given the luminence of a color
 * @param color - a given (background) color
 * @returns white or black font color
 */
export const getTextFontColor = (color?: string) => {
  if (color) {
    const rgb = hexToRgb(color);
    if (rgb) {
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
        let cValue = c / 255.0;
        if (c <= 0.04045) {
          cValue = cValue / 12.92;
        } else {
          cValue = ((cValue + 0.055) / 1.055) ^ 2.4;
        }
        return cValue;
      });
      const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return (L + 0.05) / (0.0 + 0.05) > (1.0 + 0.05) / (L + 0.05)
        ? COLORS.BLACK
        : COLORS.WHITE;
    }
  }
};

/**
 * A function to generate a random pastel color (h/t - ChatGPT)
 */
export const generateRandomPastelColor = (): string => {
  // Define the range of values for pastel colors
  const minValue = 100;
  const maxValue = 240;

  // Generate random values for each RGB component within the pastel range
  const r = Math.floor(Math.random() * (maxValue - minValue) + minValue);
  const g = Math.floor(Math.random() * (maxValue - minValue) + minValue);
  const b = Math.floor(Math.random() * (maxValue - minValue) + minValue);

  // Convert RGB values to hexadecimal representation
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

  return color;
};

/**
 * A function to darken a color (h/t - Copilot)
 */
export const darkenColor = (color: string, factor: number) => {
  const { r, g, b } = checkAndParseRgb(color) || {};
  if (r === undefined || g === undefined || b === undefined) return color;
  return `rgb(${Math.floor(r * Math.abs(1 - factor))}, ${Math.floor(
    g * Math.abs(1 - factor)
  )}, ${Math.floor(b * Math.abs(1 - factor))})`;
};

/**
 * A function to lighten a color (h/t - Copilot)
 */
export const lightenColor = (color: string, factor: number) => {
  const { r, g, b } = checkAndParseRgb(color) || {};
  if (r === undefined || g === undefined || b === undefined) return color;
  const newR = Math.floor(r + (255 - r) * factor);
  const newG = Math.floor(g + (255 - g) * factor);
  const newB = Math.floor(b + (255 - b) * factor);
  return `rgb(${newR}, ${newG}, ${newB})`;
};

/**
 * A function to get the base and contrast color for a given context
 */
export const getContextColors = <T extends ContextType>(
  context?: T
): ContextColorsType => {
  return context ? CONTEXT_COLORS[context] : SEVERITY_COLORS.plain;
};

/**
 * A function to get the dark version of a context color
 */
export const getDarkContextColor = <T extends ContextType>(context?: T) => {
  const { base } = context ? getContextColors(context) : SEVERITY_COLORS.plain;
  return darkenColor(base, DARK_CONTEXT_COLOR_FACTOR);
};

/**
 * A function to get the light version of a context color
 */
export const getLightContextColor = <T extends ContextType>(context?: T) => {
  const { base } = context ? getContextColors(context) : SEVERITY_COLORS.plain;
  return lightenColor(base, LIGHT_CONTEXT_COLOR_FACTOR);
};
