import { TabProps as MuiTabProps } from '@mui/material';

export type TabProps = MuiTabProps & {
  label: string;
  value?: number | string;
  icon?: React.ReactElement;
  iconPosition?: 'start' | 'end' | 'top' | 'bottom';
};
