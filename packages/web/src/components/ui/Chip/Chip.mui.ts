import { WHITESPACE } from '@reva-frontend/common/theme';
import { Components, type CSSObject } from '@mui/material';

export const ChipMuiConfig = {
  styleOverrides: {
    root: ({
      ownerState,
    }: {
      ownerState: {
        size?: 'small' | 'medium';
        variant?: 'filled' | 'outlined';
      };
    }) => {
      const size = ownerState.size || 'medium';
      const variant = ownerState.variant || 'filled';

      const padding =
        size === 'small'
          ? `${WHITESPACE.xsm}px ${WHITESPACE.xsm}px`
          : `${WHITESPACE.sm}px ${WHITESPACE.sm}px`;
      const fontSize = size === 'small' ? '12px' : '14px';

      const baseStyles: CSSObject = {
        padding: padding,
        borderRadius: `${WHITESPACE.lg}px`,
        fontSize: fontSize,
        fontWeight: 500,
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      };

      // Note: Context-based colors (backgroundColor, color, borderColor) are applied via sx prop in the component
      // This is because custom props like 'context' may not be accessible in styleOverrides
      if (variant === 'outlined') {
        return {
          ...baseStyles,
          // border, backgroundColor, and color will be overridden by sx prop
        };
      }

      return baseStyles;
    },
    label: {
      paddingLeft: WHITESPACE.xsm,
      paddingRight: WHITESPACE.xsm,
    },
  },
} as const satisfies Components['MuiChip'];
