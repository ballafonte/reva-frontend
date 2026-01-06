import {
  COLORS,
  CONTEXT_COLORS,
  WHITESPACE,
  ContextType,
  getLightContextColor,
} from '@common/theme';
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

  const sizeStyles = getSizeStyles();

  const baseStyles = css`
    display: inline-flex;
    align-items: center;
    gap: ${sizeStyles.gap};
    padding: ${sizeStyles.padding};
    border-radius: ${WHITESPACE.sm}px;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s ease;
    user-select: none;
    min-height: ${sizeStyles.minHeight};
    box-sizing: border-box;
    /* Full width for vertical layouts (flex-direction: column) */
    width: 100%;
    /* When parent is flex-direction: row, items should fit content */
    /* This is handled by parent containers using: & > * { width: auto; } */
    /* Or by setting width: auto on individual items in horizontal layouts */
  `;

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
      return getLightContextColor(context);
    }
    return selected ? COLORS.BLUE : 'transparent';
  };

  const getContainedTextColor = () => {
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

  const textColor = getTextColor();
  const selectedBgColor = getSelectedBackgroundColor();
  const containedBgColor = getContainedBackgroundColor();
  const containedTextColor = getContainedTextColor();
  const borderColor = getBorderColor();

  const variantStyles = {
    tile: css`
      background-color: ${selectedBgColor};
      color: ${textColor};
      ${selected
        ? css`
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          `
        : ''}
      &:hover {
        ${!disabled
          ? css`
              background-color: ${selected ? selectedBgColor : COLORS.GRAY_100};
              color: ${contextColor ? contextColor.text : COLORS.GRAY_700};
            `
          : ''}
      }
    `,
    contained: css`
      background-color: ${containedBgColor};
      color: ${containedTextColor};
      &:hover {
        ${!disabled
          ? css`
              background-color: ${selected
                ? containedBgColor
                : COLORS.GRAY_100};
              color: ${contextColor ? contextColor.text : COLORS.GRAY_700};
            `
          : ''}
      }
    `,
    outlined: css`
      background-color: transparent;
      border: 1px solid ${borderColor};
      color: ${textColor};
      &:hover {
        ${!disabled
          ? css`
              border-color: ${selected ? borderColor : COLORS.GRAY_400};
              color: ${contextColor ? contextColor.text : COLORS.GRAY_700};
            `
          : ''}
      }
    `,
    ghost: css`
      background-color: transparent;
      color: ${textColor};
      &:hover {
        ${!disabled
          ? css`
              background-color: ${COLORS.GRAY_100};
              color: ${contextColor ? contextColor.text : COLORS.GRAY_700};
            `
          : ''}
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
