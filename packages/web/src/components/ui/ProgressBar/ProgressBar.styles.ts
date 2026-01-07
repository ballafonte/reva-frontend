import {
  CONTEXT_COLORS,
  COLORS,
  WHITESPACE,
} from '@reva-frontend/common/theme';
import { ContextType } from '@reva-frontend/common/theme';
import { SxProps, Theme } from '@mui/material';
import { ProgressBarProps } from './ProgressBar.types';

export const progressBarStyles = ({
  context = 'primary',
  height = 8,
}: Pick<ProgressBarProps, 'context' | 'height'>): SxProps<Theme> => {
  const contextColor =
    CONTEXT_COLORS[context as ContextType] || CONTEXT_COLORS.primary;

  return {
    backgroundColor: COLORS.GRAY_200,
    borderRadius: `${WHITESPACE.sm}px`,
    height: `${height}px`,
    overflow: 'hidden',
    position: 'relative',
    '& .progress-bar-fill': {
      backgroundColor: contextColor.base,
      height: '100%',
      borderRadius: `${WHITESPACE.sm}px`,
      transition: 'width 0.3s ease',
    },
  };
};
