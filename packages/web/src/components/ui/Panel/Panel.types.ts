import { PaperProps } from '@mui/material';
import { PanelHeaderProps } from './PanelHeader.types';
import { PanelFooterProps } from './PanelFooter.types';

export type PanelProps = Omit<PaperProps, 'elevation' | 'variant'> & {
  variant?: 'outlined' | 'filled';
  padding?: boolean;
  header?: PanelHeaderProps;
  footer?: PanelFooterProps;
};
