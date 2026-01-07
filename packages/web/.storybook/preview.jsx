import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../src/theme/mui/theme';
import '@/theme/fonts.css';
import '@/theme/globals.css';

const canvasStyles = `
  .sb-show-main {
    background-color: #E1E3EA !important;
  }
`;

/** @type {import('@storybook/react').Preview} */
const preview = {
  decorators: [
    (Story) => (
      <>
        <style>{canvasStyles}</style>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </>
    ),
  ],
  options: {
    storySort: {
      order: ['Welcome', '*'],
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
