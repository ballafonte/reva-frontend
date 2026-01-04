import '@mui/material/styles';
import '@mui/material/Button';
import { ThemeContexts, SeverityContexts } from '@reva-frontend/common';

declare module '@mui/material/styles' {
  interface Palette {
    themeContext: Record<
      ThemeContexts,
      { base: string; contrast: string; text: string }
    >;
    severityContext: Record<
      SeverityContexts,
      { base: string; contrast: string; text: string }
    >;
    highlight: PaletteColor;
    promotion: PaletteColor;
    plain: PaletteColor;
    muted: PaletteColor;
  }

  interface PaletteOptions {
    themeContext?: Palette['themeContext'];
    severityContext?: Palette['severityContext'];
    highlight?: PaletteColorOptions;
    promotion?: PaletteColorOptions;
    plain?: PaletteColorOptions;
    muted?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
  }
}
