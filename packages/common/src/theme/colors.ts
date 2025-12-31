// TODO: code split this file into constants vs util functions

import {
	ThemeContexts,
	type ThemeContextType,
	SeverityContexts,
	type SeverityContextType,
} from './theme.types';

export type RgbColorType = {
	r: number;
	g: number;
	b: number;
};

export type HexColorType = string;

export const COLORS = {
	BLUE: '#0D6EFD',
	INDIGO: '#6610F2',
	PURPLE: '#6F42C1',
	PINK: '#D63384',
	RED: '#DC3545',
	ORANGE: '#FD7E14',
	YELLOW: '#FFC107',
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
		base: '#FFC80A',
		contrast: '#000000',
		text: '#AC8219',
	},
	[ThemeContexts.SECONDARY]: {
		base: '#E1E3EA',
		contrast: '#3F4254',
		text: '#7E8299',
	},
	[ThemeContexts.TERTIARY]: {
		base: '#F9F9F9',
		contrast: '#000000',
		text: '#181C32',
	},
} as const;

type ThemeColorsKeys = keyof typeof THEME_COLORS;

export type ThemeColorsType = (typeof THEME_COLORS)[ThemeColorsKeys];

// TODO: Rename to `SEVERITY_CONTEXT_COLORS` and add text colors `darkenColor(base, 0.3)`
export const CONTEXT_COLORS = {
	[SeverityContexts.SUCCESS]: {
		base: '#50CD89',
		contrast: '#ffffff',
		text: '#146c43',
	},
	[SeverityContexts.WARNING]: {
		base: '#FFC700',
		contrast: '#ffffff',
		text: '#997404',
	},
	[SeverityContexts.DANGER]: {
		base: '#F1416C',
		contrast: '#ffffff',
		text: '#b02a37',
	},
	[SeverityContexts.INFO]: {
		base: '#7239EA',
		contrast: '#ffffff',
		text: '#087990',
	},
	[SeverityContexts.PLAIN]: {
		base: COLORS.GRAY_300,
		contrast: COLORS.GRAY_900,
		text: COLORS.GRAY_700,
	},
	[SeverityContexts.MUTED]: {
		base: COLORS.GRAY_300,
		contrast: COLORS.GRAY_500,
		text: COLORS.GRAY_400,
	},
} as const;

type ContextColorsKeys = keyof typeof CONTEXT_COLORS;

export type ContextColorsType = (typeof CONTEXT_COLORS)[ContextColorsKeys];

export const DARK_CONTEXT_COLOR_FACTOR = 0.65;

export const LIGHT_CONTEXT_COLOR_FACTOR = 0.94;

export const ELEMENT_COLORS = {
	TEXT: COLORS.GRAY_900,
	BORDER: COLORS.GRAY_300,
	BACKGROUND: COLORS.WHITE,
	BODY: '#F4F6FA',
	BOX_SHADOW: '#523F69',
	CODE: '#B93993',
	LINK: '#AC8219', // primary-dark color: `darkenColor(THEME_COLORS.primary, 0.3)`
} as const;

/**
 * A regular expression to match rgb-formatted color strings
 */
export const RGB_REGEX = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

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
			return (L + 0.05) / (0.0 + 0.05) > (1.0 + 0.05) / (L + 0.05) ? '#000' : '#fff';
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
export const getContextColors = <T extends ThemeContextType | SeverityContextType>(
	context?: T
): ThemeColorsType | ContextColorsType => {
	return context ? { ...THEME_COLORS, ...CONTEXT_COLORS }[context] : CONTEXT_COLORS.plain;
};

/**
 * A function to get the dark version of a context color
 */
export const getDarkContextColor = <T extends ThemeContextType | SeverityContextType>(
	context?: T
) => {
	const { base } = context ? getContextColors(context) : CONTEXT_COLORS.plain;
	return darkenColor(base, DARK_CONTEXT_COLOR_FACTOR);
};

/**
 * A function to get the light version of a context color
 */
export const getLightContextColor = <T extends ThemeContextType | SeverityContextType>(
	context?: T
) => {
	const { base } = context ? getContextColors(context) : CONTEXT_COLORS.plain;
	return lightenColor(base, LIGHT_CONTEXT_COLOR_FACTOR);
};
