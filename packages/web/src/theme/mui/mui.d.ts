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
    tertiary: PaletteColor;
    plain: PaletteColor;
    muted: PaletteColor;
    danger: PaletteColor;
  }

  interface PaletteOptions {
    themeContext?: Palette['themeContext'];
    severityContext?: Palette['severityContext'];
    tertiary?: PaletteColorOptions;
    plain?: PaletteColorOptions;
    muted?: PaletteColorOptions;
    danger?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
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
    tertiary: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    tertiary: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    tertiary: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    tertiary: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Switch' {
  interface SwitchPropsColorOverrides {
    tertiary: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    tertiary: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/Radio' {
  interface RadioPropsColorOverrides {
    tertiary: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    tertiary: true;
    plain: true;
    muted: true;
    danger: true;
    error: false;
  }
}
