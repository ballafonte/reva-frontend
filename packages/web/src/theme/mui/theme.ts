import { createTheme } from '@mui/material/styles';
import { ButtonMuiConfig } from '@/components/ui/Button';
import { ChipMuiConfig } from '@/components/ui/Chip';
import {
  AppBarMuiConfig,
  CardMuiConfig,
  DialogMuiConfig,
  DrawerMuiConfig,
  MenuMuiConfig,
  PaperMuiConfig,
  PopoverMuiConfig,
} from './components';
import { palette } from './palette';

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
    MuiButton: ButtonMuiConfig,
    MuiCard: CardMuiConfig,
    MuiChip: ChipMuiConfig,
    MuiDialog: DialogMuiConfig,
    MuiDrawer: DrawerMuiConfig,
    MuiMenu: MenuMuiConfig,
    MuiPaper: PaperMuiConfig,
    MuiPopover: PopoverMuiConfig,
  },
});
