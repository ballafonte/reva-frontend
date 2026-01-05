import { Components } from '@mui/material';

export const CardMuiConfig = {
  styleOverrides: {
    root: {
      boxShadow: 'none',
    },
  },
} as const satisfies Components['MuiCard'];
