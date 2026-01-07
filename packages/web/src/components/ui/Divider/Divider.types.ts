import { ContextType, WHITESPACE } from '@reva-frontend/common/theme';

export type DividerProps = {
  color?: ContextType;
  containerStyle?: React.CSSProperties;
  icon?: React.ElementType;
  iconLeft?: boolean;
  iconRight?: boolean;
  lineThickness?: number;
  onClick?: (_: React.MouseEvent) => void;
  size?: keyof typeof WHITESPACE;
  style?: React.CSSProperties;
};
