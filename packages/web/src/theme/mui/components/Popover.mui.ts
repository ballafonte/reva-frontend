import { Components } from '@mui/material';

export const PopoverMuiConfig = {
  styleOverrides: {
    paper: {
      boxShadow: 'none',
    },
  },
} as const satisfies Components['MuiPopover'];
