import { SEVERITY_COLORS, SeverityContexts } from '@reva-frontend/common';

export const ButtonMui = {
  styleOverrides: {
    root: ({
      ownerState,
    }: {
      ownerState: { color?: string; variant?: string };
    }) => {
      // Use a darker color for plain buttons when using outlined or text variants
      if (
        ownerState.color === 'plain' &&
        (ownerState.variant === 'outlined' || ownerState.variant === 'text')
      ) {
        const darkerColor = SEVERITY_COLORS[SeverityContexts.PLAIN].text;
        return {
          color: darkerColor,
          ...(ownerState.variant === 'outlined' && {
            borderColor: darkerColor,
            '&:hover': {
              borderColor: darkerColor,
            },
          }),
        };
      }
      return {};
    },
  },
};
