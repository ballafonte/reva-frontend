import {
  COLORS,
  CONTEXT_COLORS,
  ContextType,
} from '@reva-frontend/common/theme';
import { SxProps, Theme } from '@mui/material';
import { TabProps } from './Tab.types';

export const tabStyles = ({
  context,
}: Pick<TabProps, 'context'>): SxProps<Theme> => {
  const contextColor = context
    ? CONTEXT_COLORS[context as ContextType]
    : undefined;

  return {
    textTransform: 'none',
    minHeight: 'auto',
    padding: '12px 16px',
    color: contextColor ? contextColor.text : COLORS.GRAY_700,
    fontWeight: 500,
    '&.Mui-selected': {
      color: contextColor ? contextColor.text : COLORS.BLUE,
      borderBottom: contextColor
        ? `2px solid ${contextColor.base}`
        : `2px solid ${COLORS.BLUE}`,
    },
    '&:hover': {
      color: contextColor ? contextColor.text : COLORS.BLUE,
    },
  };
};
