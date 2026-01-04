import { ContextType } from '@common/theme';

export type TagProps = {
  label: string;
  context?: ContextType;
  onDelete?: () => void;
  deleteIcon?: React.ReactElement;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
};
