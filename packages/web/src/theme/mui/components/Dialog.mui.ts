import { Components } from '@mui/material';

export const DialogMuiConfig = {
  styleOverrides: {
    paper: {
      boxShadow: 'none',
    },
  },
} as const satisfies Components['MuiDialog'];
