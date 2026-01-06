import { Components, type CSSObject } from '@mui/material';
import { SEVERITY_COLORS, SeverityContexts } from '@reva-frontend/common';

export const ButtonMuiConfig = {
  styleOverrides: {
    root: ({
      ownerState,
    }: {
      ownerState: { color?: string; variant?: string };
    }) => {
      const baseStyles: CSSObject = {};

      // Add subtle shadow for contained buttons
      if (ownerState.variant === 'contained') {
        baseStyles.boxShadow =
          'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px';
      }

      // Use a darker color for plain buttons when using outlined or ghost variants
      // Note: 'ghost' maps to MUI's 'text' variant, so we check for 'text' here
      if (
        ownerState.color === 'plain' &&
        (ownerState.variant === 'outlined' || ownerState.variant === 'text')
      ) {
        const darkerColor = SEVERITY_COLORS[SeverityContexts.PLAIN].text;
        return {
          ...baseStyles,
          color: darkerColor,
          ...(ownerState.variant === 'outlined' && {
            borderColor: darkerColor,
            '&:hover': {
              borderColor: darkerColor,
            },
          }),
        };
      }

      return baseStyles;
    },
  },
} as const satisfies Components['MuiButton'];
