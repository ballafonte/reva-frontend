import {
  COLORS,
  CONTEXT_COLORS,
  ELEMENT_COLORS,
  WHITESPACE,
  ContextType,
} from '@common/theme';
import { SxProps, Theme } from '@mui/material';

export const inputStyles = ({
  context,
}: {
  context?: ContextType;
}): SxProps<Theme> => {
  // Get the context color for focused state
  const contextColor = context
    ? CONTEXT_COLORS[context as ContextType]
    : undefined;

  return {
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        ...(contextColor && { color: `${contextColor.text} !important` }),
      },
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: `${WHITESPACE.sm}px`,
      '& fieldset': {
        borderColor: ELEMENT_COLORS.BORDER,
      },
      '&:hover fieldset': {
        borderColor: COLORS.GRAY_400,
      },
      '&.Mui-focused fieldset': {
        ...(contextColor && { borderColor: `${contextColor.base} !important` }),
        borderWidth: '1px',
      },
      '&.Mui-error fieldset': {
        borderColor: COLORS.RED,
      },
    },
    '& .MuiFilledInput-root': {
      borderRadius: `${WHITESPACE.sm}px ${WHITESPACE.sm}px 0 0`,
      backgroundColor: COLORS.GRAY_100,
      '&:hover': {
        backgroundColor: COLORS.GRAY_200,
      },
      '&.Mui-focused': {
        backgroundColor: COLORS.GRAY_100,
      },
    },
    '& .MuiInput-root': {
      '&::before': {
        borderBottomColor: ELEMENT_COLORS.BORDER,
      },
      '&:hover:not(.Mui-disabled)::before': {
        borderBottomColor: COLORS.GRAY_400,
      },
      '&.Mui-focused::after': {
        ...(contextColor && {
          borderBottomColor: `${contextColor.base} !important`,
        }),
      },
    },
  };
};
