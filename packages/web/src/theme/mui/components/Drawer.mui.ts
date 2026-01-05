import { Components } from '@mui/material';

export const DrawerMuiConfig = {
  styleOverrides: {
    paper: {
      boxShadow: 'none',
    },
  },
} as const satisfies Components['MuiDrawer'];
