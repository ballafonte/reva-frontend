import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { ButtonMui } from '@/components/ui/Button';

export const theme = createTheme({
  palette,
  typography: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: 'Poppins, sans-serif',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  components: {
    MuiButton: ButtonMui,
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: 'none',
        },
        elevation2: {
          boxShadow: 'none',
        },
        elevation3: {
          boxShadow: 'none',
        },
        elevation4: {
          boxShadow: 'none',
        },
        elevation5: {
          boxShadow: 'none',
        },
        elevation6: {
          boxShadow: 'none',
        },
        elevation7: {
          boxShadow: 'none',
        },
        elevation8: {
          boxShadow: 'none',
        },
        elevation9: {
          boxShadow: 'none',
        },
        elevation10: {
          boxShadow: 'none',
        },
        elevation11: {
          boxShadow: 'none',
        },
        elevation12: {
          boxShadow: 'none',
        },
        elevation13: {
          boxShadow: 'none',
        },
        elevation14: {
          boxShadow: 'none',
        },
        elevation15: {
          boxShadow: 'none',
        },
        elevation16: {
          boxShadow: 'none',
        },
        elevation17: {
          boxShadow: 'none',
        },
        elevation18: {
          boxShadow: 'none',
        },
        elevation19: {
          boxShadow: 'none',
        },
        elevation20: {
          boxShadow: 'none',
        },
        elevation21: {
          boxShadow: 'none',
        },
        elevation22: {
          boxShadow: 'none',
        },
        elevation23: {
          boxShadow: 'none',
        },
        elevation24: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: 'none',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: 'none',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: 'none',
        },
      },
    },
  },
});
