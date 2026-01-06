import { COLORS } from '@common/theme';
import { SxProps, Theme } from '@mui/material';

export const tabsStyles = (): SxProps<Theme> => {
  return {
    borderBottom: `1px solid ${COLORS.GRAY_300}`,
    minHeight: 'auto',
    '& .MuiTabs-indicator': {
      display: 'none', // Hide default indicator since we're using borderBottom on Tab
    },
  };
};
