import { WHITESPACE } from '@reva-frontend/common/theme';
import { SxProps, Theme } from '@mui/material';

export const panelHeaderStyles = (): SxProps<Theme> => {
  return {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: `${WHITESPACE.sm}px`,
    paddingBottom: `${WHITESPACE.sm}px`,
    '&:last-child': {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottom: 'none',
    },
  };
};
