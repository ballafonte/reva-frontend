import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { ButtonMui } from '@/components/ui/Button';

export const theme = createTheme({
  palette,
  components: {
    MuiButton: ButtonMui,
  },
});
