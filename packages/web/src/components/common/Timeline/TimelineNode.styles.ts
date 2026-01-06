import {
  CONTEXT_COLORS,
  COLORS,
  ContextType,
  getLightContextColor,
  WHITESPACE,
} from '@common/theme';
import { css } from '@emotion/react';
import { theme } from '@/theme/mui/theme';
import { TimelineNodeProps } from './TimelineNode.types';

export const timelineNodeStyles = ({
  context,
  transparent = false,
  orientation = 'vertical',
}: Pick<TimelineNodeProps, 'context' | 'transparent' | 'orientation'>) => {
  const backgroundColor =
    !transparent && context ? getLightContextColor(context) : 'transparent';

  const isHorizontal = orientation === 'horizontal';

  return css`
    display: flex;
    flex-direction: ${isHorizontal ? 'column' : 'row'};
    align-items: ${isHorizontal ? 'center' : 'flex-start'};
    gap: ${isHorizontal ? '8px' : '12px'};
    padding: ${WHITESPACE.sm}px ${WHITESPACE.md}px;
    border-radius: 4px;
    background-color: ${backgroundColor};
    position: relative;
    width: ${isHorizontal ? '100%' : 'auto'};
  `;
};

export const circleStyles = ({
  context,
  orientation = 'vertical',
}: Pick<TimelineNodeProps, 'context' | 'orientation'>) => {
  const contextColor = context
    ? CONTEXT_COLORS[context as ContextType]
    : undefined;

  const circleColor = contextColor ? contextColor.base : COLORS.GRAY_400;
  const isHorizontal = orientation === 'horizontal';

  // For vertical: line is at left: 5px, width: 2px (center at 6px)
  // Circle is 10px wide, so center at 5px from left edge
  // Position absolutely at left: 1px (6px - 5px) to center on line
  // For horizontal: line is at top: 13px, height: 2px (center at 14px)
  // Circle is 10px tall, so center at 5px from top edge
  // Position absolutely at top: 9px (14px - 5px) to center on line

  return css`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${circleColor};
    flex-shrink: 0;
    position: absolute;
    z-index: 2;
    ${isHorizontal
      ? css`
          left: 50%;
          top: -${WHITESPACE.md - 1}px;
          transform: translateX(-50%) translateY(-50%);
        `
      : css`
          left: -${WHITESPACE.md - 1}px;
          top: calc(
            ${WHITESPACE.sm}px +
              (
                (
                    ${theme.typography.caption.lineHeight} *
                      ${theme.typography.caption.fontSize}
                  ) /
                  2
              )
          );
          transform: translateX(-50%) translateY(-50%);
        `}
  `;
};

export const contentStyles = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;
