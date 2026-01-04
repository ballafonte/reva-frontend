import { PaperProps } from '@mui/material';

export type PanelProps = Omit<PaperProps, 'elevation' | 'variant'> & {
  variant?: 'outlined' | 'filled';
  padding?: boolean;
};
