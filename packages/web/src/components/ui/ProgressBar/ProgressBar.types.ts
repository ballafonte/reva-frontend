import { ContextType } from '@common/theme';

export type ProgressBarProps = {
  value?: number; // 0-100 (optional when variant is indeterminate)
  variant?: 'determinate' | 'indeterminate';
  context?: ContextType;
  height?: number;
  showLabel?: boolean;
  label?: string;
};
