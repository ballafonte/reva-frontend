import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { ButtonMui } from '@/components/ui/Button';
import {
  AppBarMuiConfig,
  CardMuiConfig,
  DialogMuiConfig,
  DrawerMuiConfig,
  MenuMuiConfig,
  PaperMuiConfig,
  PopoverMuiConfig,
} from './components';

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
    MuiAppBar: AppBarMuiConfig,
    MuiButton: ButtonMui,
    MuiCard: CardMuiConfig,
    MuiDialog: DialogMuiConfig,
    MuiDrawer: DrawerMuiConfig,
    MuiMenu: MenuMuiConfig,
    MuiPaper: PaperMuiConfig,
    MuiPopover: PopoverMuiConfig,
  },
});
