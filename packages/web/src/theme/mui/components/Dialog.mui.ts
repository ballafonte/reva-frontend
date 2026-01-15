import { Components } from '@mui/material';
import { WHITESPACE } from '@reva-frontend/common/theme';

export const DialogMuiConfig = {
  styleOverrides: {
    paper: {
      boxShadow: 'none',
      borderRadius: `${WHITESPACE.md}px`,
    },
  },
} as const satisfies Components['MuiDialog'];
