import { SEVERITY_COLORS, SeverityContexts } from '@reva-frontend/common';

export const ButtonMui = {
  styleOverrides: {
    root: ({
      ownerState,
    }: {
      ownerState: { color?: string; variant?: string };
    }) => {
      const baseStyles: Record<string, any> = {};

      // Add subtle shadow for contained buttons
      if (ownerState.variant === 'contained') {
        baseStyles.boxShadow = '0 1px 1px rgba(0, 0, 0, 0.5)';
      }

      // Use a darker color for plain buttons when using outlined or text variants
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
};
