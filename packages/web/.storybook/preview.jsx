import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { THEME_COLORS, ThemeContexts } from '@reva-frontend/common';
import '../src/theme/globals.css';

// Create MUI theme using design tokens from packages/common
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: THEME_COLORS[ThemeContexts.PRIMARY].base,
      contrastText: THEME_COLORS[ThemeContexts.PRIMARY].contrast,
    },
    secondary: {
      main: THEME_COLORS[ThemeContexts.SECONDARY].base,
      contrastText: THEME_COLORS[ThemeContexts.SECONDARY].contrast,
    },
  },
});

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;

