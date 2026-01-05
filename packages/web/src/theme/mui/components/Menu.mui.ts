import { Components } from '@mui/material';

export const MenuMuiConfig = {
  styleOverrides: {
    paper: {
      boxShadow: 'none',
    },
  },
} as const satisfies Components['MuiMenu'];
