import { ContextType, Size } from '@reva-frontend/common/theme';
import { ReactElement } from 'react';

export type PositionX = 'left' | 'right';
export type PositionY = 'top' | 'bottom';

export type BadgeProps = {
  badgeContent: ReactElement | string;
  children: ReactElement;
  context?: ContextType;
  size?: Size | number;
  positionX?: PositionX;
  positionY?: PositionY;
  onClick?: () => void;
};
