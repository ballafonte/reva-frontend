import { TabsProps as MuiTabsProps } from '@mui/material';

export type TabsProps = MuiTabsProps & {
  value: number | string;
  onChange: (event: React.SyntheticEvent, newValue: number | string) => void;
};
