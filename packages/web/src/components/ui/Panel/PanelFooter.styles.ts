import { WHITESPACE } from '@reva-frontend/common/theme';
import { SxProps, Theme } from '@mui/material';

export const panelFooterStyles = (): SxProps<Theme> => {
  return {
    alignItems: 'center',
    display: 'flex',
    gap: `${WHITESPACE.md}px`,
    justifyContent: 'flex-end',
    marginTop: `${WHITESPACE.sm}px`,
    paddingTop: `${WHITESPACE.sm}px`,
    '&:first-child': {
      marginTop: 0,
      paddingTop: 0,
      borderTop: 'none',
    },
  };
};
