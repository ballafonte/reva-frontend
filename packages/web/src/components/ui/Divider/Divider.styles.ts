import {
  COLORS,
  CONTEXT_COLORS,
  WHITESPACE,
} from '@reva-frontend/common/theme';
import { ContextType } from '@reva-frontend/common/theme';

export const dividerStyles = (
  gapSize: keyof typeof WHITESPACE = 'md'
): React.CSSProperties => ({
  alignItems: 'center',
  display: 'flex',
  gap: WHITESPACE[gapSize],
  justifyContent: 'center',
  width: '100%',
});

export const dividerHorizontalRuleStyles = (
  color?: ContextType,
  lineThickness?: number
): React.CSSProperties => {
  const borderColor = color
    ? CONTEXT_COLORS[color as ContextType]?.base || COLORS.GRAY_400
    : COLORS.GRAY_400;

  return {
    border: 0,
    borderTopColor: borderColor,
    borderTopStyle: 'solid',
    borderTopWidth: lineThickness || 1,
    flex: 1,
  };
};
