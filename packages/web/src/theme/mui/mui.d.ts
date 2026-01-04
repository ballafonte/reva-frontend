import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/Alert';
import '@mui/material/Chip';
import '@mui/material/Badge';
import '@mui/material/CircularProgress';
import '@mui/material/LinearProgress';
import '@mui/material/Switch';
import '@mui/material/Checkbox';
import '@mui/material/Radio';
import '@mui/material/IconButton';
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
    danger: PaletteColor;
  }

  interface PaletteOptions {
    themeContext?: Palette['themeContext'];
    severityContext?: Palette['severityContext'];
    highlight?: PaletteColorOptions;
    promotion?: PaletteColorOptions;
    plain?: PaletteColorOptions;
    muted?: PaletteColorOptions;
    danger?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsColorOverrides {
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Switch' {
  interface SwitchPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Radio' {
  interface RadioPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    highlight: true;
    promotion: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}
