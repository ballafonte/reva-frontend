import { Components } from '@mui/material';

export const AppBarMuiConfig = {
  styleOverrides: {
    root: {
      boxShadow: 'none',
    },
  },
} as const satisfies Components['MuiAppBar'];
