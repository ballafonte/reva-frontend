import { ContextType } from '@common/theme';
import { TabProps as MuiTabProps } from '@mui/material';

export type TabProps = MuiTabProps & {
  context?: ContextType;
  label: string;
  value?: number | string;
  icon?: React.ReactElement;
  iconPosition?: 'start' | 'end' | 'top' | 'bottom';
};
