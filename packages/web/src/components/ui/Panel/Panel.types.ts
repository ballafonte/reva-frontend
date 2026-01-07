import { PaperProps } from '@mui/material';
import { WhitespaceSize } from '@reva-frontend/common';
import { PanelHeaderProps } from './PanelHeader.types';
import { PanelFooterProps } from './PanelFooter.types';

export type PanelProps = Omit<PaperProps, 'elevation' | 'variant'> & {
  header?: PanelHeaderProps;
  footer?: PanelFooterProps;
  padding?: WhitespaceSize;
  variant?: 'outlined' | 'filled';
};
