import {
  COLORS,
  CONTEXT_COLORS,
  WHITESPACE,
  ContextType,
  getLightContextColor,
} from '@reva-frontend/common/theme';
import { css } from '@emotion/react';
import { MenuItemProps } from './MenuItem.types';

export const menuItemStyles = ({
  variant = 'ghost',
  selected = false,
  disabled = false,
  context,
  size = 'md',
}: Pick<
  MenuItemProps,
  'variant' | 'selected' | 'disabled' | 'context' | 'size'
>) => {
  const contextColor = context
    ? CONTEXT_COLORS[context as ContextType]
    : undefined;

  // Size-based styling
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: `${WHITESPACE.xsm}px ${WHITESPACE.sm}px`,
          minHeight: '32px',
          gap: `${WHITESPACE.xsm}px`,
        };
      case 'lg':
        return {
          padding: `${WHITESPACE.md}px ${WHITESPACE.lg}px`,
          minHeight: '48px',
          gap: `${WHITESPACE.md}px`,
        };
      case 'md':
      default:
        return {
          padding: `${WHITESPACE.sm}px ${WHITESPACE.md}px`,
          minHeight: '40px',
          gap: `${WHITESPACE.sm}px`,
        };
    }
  };

  // Determine colors based on context
  const getTextColor = () => {
    if (contextColor) {
      return contextColor.text;
    }
    return selected ? COLORS.BLUE : COLORS.GRAY_600;
  };

  const getSelectedBackgroundColor = () => {
    if (contextColor && selected) {
      return getLightContextColor(context);
    }
    return selected ? COLORS.WHITE : 'transparent';
  };

  const getContainedBackgroundColor = () => {
    if (contextColor && selected) {
      return contextColor.base;
    }
    return selected ? COLORS.BLUE : 'transparent';
  };

  const getContainedTextColor = () => {
    if (contextColor && selected) {
      return contextColor.contrast;
    }
    if (contextColor) {
      return contextColor.text;
    }
    return selected ? COLORS.WHITE : COLORS.GRAY_600;
  };

  const getBorderColor = () => {
    // For outlined variant, border color should match text color when selected
    if (selected) {
      return getTextColor();
    }
    return COLORS.GRAY_300;
  };

  const sizeStyles = getSizeStyles();
  const textColor = getTextColor();
  const selectedBgColor = getSelectedBackgroundColor();
  const containedBgColor = getContainedBackgroundColor();
  const containedTextColor = getContainedTextColor();
  const borderColor = getBorderColor();

  const baseStyles = css`
    align-items: center;
    border-radius: ${WHITESPACE.sm}px;
    box-sizing: border-box;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    display: inline-flex;
    flex: '0 0 auto';
    gap: ${sizeStyles.gap};
    min-height: ${sizeStyles.minHeight};
    min-width: unset;
    padding: ${sizeStyles.padding};
    transition: all 0.2s ease;
    user-select: none;
    /* Full width for vertical layouts (flex-direction: column) */
    width: 100%;
    /* When parent is flex-direction: row, items should fit content */
    /* This is handled by parent containers using: & > * { width: auto; } */
    /* Or by setting width: auto on individual items in horizontal layouts */
  `;

  const variantStyles = {
    tile: css`
      background-color: ${selectedBgColor} !important;
      color: ${textColor} !important;
      ${selected
        ? css`
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          `
        : ''}
      &:hover {
        ${!disabled
          ? css`
              background-color: ${selected
                ? selectedBgColor
                : COLORS.GRAY_100} !important;
              color: ${contextColor
                ? contextColor.text
                : COLORS.GRAY_700} !important;
            `
          : ''}
      }
      &:active {
        ${!disabled
          ? css`
              background-color: ${selected
                ? selectedBgColor
                : COLORS.GRAY_100} !important;
              color: ${contextColor
                ? contextColor.text
                : COLORS.GRAY_700} !important;
            `
          : ''}
      }
      &.Mui-selected {
        background-color: ${selectedBgColor} !important;
        color: ${textColor} !important;
        &:hover {
          background-color: ${selected
            ? selectedBgColor
            : COLORS.GRAY_100} !important;
          color: ${contextColor
            ? contextColor.text
            : COLORS.GRAY_700} !important;
        }
        &:active {
          background-color: ${selected
            ? selectedBgColor
            : COLORS.GRAY_100} !important;
          color: ${contextColor
            ? contextColor.text
            : COLORS.GRAY_700} !important;
        }
      }
      &.Mui-focusVisible {
        background-color: ${selectedBgColor} !important;
        color: ${textColor} !important;
      }
    `,
    contained: css`
      background-color: ${containedBgColor} !important;
      color: ${containedTextColor} !important;
      &:hover {
        ${!disabled
          ? css`
              background-color: ${selected
                ? containedBgColor
                : COLORS.GRAY_100} !important;
              color: ${contextColor
                ? contextColor.contrast
                : COLORS.GRAY_700} !important;
            `
          : ''}
      }
      &:active {
        ${!disabled
          ? css`
              background-color: ${selected
                ? containedBgColor
                : COLORS.GRAY_100} !important;
              color: ${contextColor
                ? contextColor.text
                : COLORS.GRAY_700} !important;
            `
          : ''}
      }
      &.Mui-selected {
        background-color: ${containedBgColor} !important;
        color: ${containedTextColor} !important;
        &:hover {
          background-color: ${selected
            ? containedBgColor
            : COLORS.GRAY_100} !important;
          color: ${contextColor
            ? contextColor.text
            : COLORS.GRAY_700} !important;
        }
        &:active {
          background-color: ${selected
            ? containedBgColor
            : COLORS.GRAY_100} !important;
          color: ${contextColor
            ? contextColor.text
            : COLORS.GRAY_700} !important;
        }
      }
      &.Mui-focusVisible {
        background-color: ${containedBgColor} !important;
        color: ${containedTextColor} !important;
      }
    `,
    outlined: css`
      background-color: transparent !important;
      border: 1px solid ${borderColor};
      color: ${textColor} !important;
      &:hover {
        ${!disabled
          ? css`
              border-color: ${selected
                ? borderColor
                : COLORS.GRAY_400} !important;
              color: ${contextColor
                ? contextColor.text
                : COLORS.GRAY_700} !important;
            `
          : ''}
      }
      &:active {
        ${!disabled
          ? css`
              border-color: ${selected
                ? borderColor
                : COLORS.GRAY_400} !important;
              color: ${contextColor
                ? contextColor.text
                : COLORS.GRAY_700} !important;
            `
          : ''}
      }
      &.Mui-selected {
        background-color: transparent !important;
        color: ${textColor} !important;
        &:hover {
          border-color: ${borderColor} !important;
          color: ${contextColor
            ? contextColor.text
            : COLORS.GRAY_700} !important;
        }
        &:active {
          border-color: ${borderColor} !important;
          color: ${contextColor
            ? contextColor.text
            : COLORS.GRAY_700} !important;
        }
      }
      &.Mui-focusVisible {
        background-color: transparent !important;
        border-color: ${borderColor} !important;
        color: ${textColor} !important;
      }
    `,
    ghost: css`
      background-color: transparent !important;
      color: ${textColor} !important;
      &:hover {
        ${!disabled
          ? css`
              background-color: ${COLORS.GRAY_100} !important;
              color: ${contextColor
                ? contextColor.text
                : COLORS.GRAY_700} !important;
            `
          : ''}
      }
      &:active {
        ${!disabled
          ? css`
              background-color: ${COLORS.GRAY_100} !important;
              color: ${contextColor
                ? contextColor.text
                : COLORS.GRAY_700} !important;
            `
          : ''}
      }
      &.Mui-selected {
        background-color: transparent !important;
        color: ${textColor} !important;
        &:hover {
          background-color: ${COLORS.GRAY_100} !important;
          color: ${contextColor
            ? contextColor.text
            : COLORS.GRAY_700} !important;
        }
        &:active {
          background-color: ${COLORS.GRAY_100} !important;
          color: ${contextColor
            ? contextColor.text
            : COLORS.GRAY_700} !important;
        }
      }
      &.Mui-focusVisible {
        background-color: transparent !important;
        color: ${textColor} !important;
      }
    `,
  };

  const disabledStyles = disabled
    ? css`
        opacity: 0.5;
        pointer-events: none;
      `
    : css``;

  return css`
    ${baseStyles}
    ${variantStyles[variant]}
    ${disabledStyles}
  `;
};
