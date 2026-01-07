import { CONTEXT_COLORS, WHITESPACE } from '@reva-frontend/common/theme';
import { ContextType } from '@reva-frontend/common/theme';
import React from 'react';
import { IconWrapper } from '../IconWrapper';
import { dividerStyles, dividerHorizontalRuleStyles } from './Divider.styles';
import { DividerProps } from './Divider.types';

export const Divider: React.FC<DividerProps> = ({
  color,
  containerStyle,
  icon: IconComponent,
  iconLeft,
  iconRight,
  lineThickness,
  onClick,
  size,
  style,
}) => {
  const containerStyles = dividerStyles(size);
  const hrStyles = dividerHorizontalRuleStyles(color, lineThickness);

  return (
    <div
      onClick={onClick}
      style={{
        ...containerStyles,
        ...containerStyle,
      }}
    >
      {!iconLeft && <hr style={{ ...hrStyles, ...style }} />}
      {IconComponent && (
        <IconWrapper
          component={IconComponent}
          sx={{
            color: color
              ? CONTEXT_COLORS[color as ContextType]?.base
              : undefined,
            fontSize: size ? `${WHITESPACE[size]}px` : undefined,
          }}
        />
      )}
      {IconComponent && !iconRight && <hr style={{ ...hrStyles, ...style }} />}
    </div>
  );
};
