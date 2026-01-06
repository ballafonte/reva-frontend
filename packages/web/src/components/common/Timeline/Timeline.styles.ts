import { css } from '@emotion/react';
import { COLORS, WHITESPACE } from '@common/theme';
import { TimelineOrientation } from './TimelineNode.types';

export const timelineStyles = (
  orientation: TimelineOrientation = 'vertical'
) => {
  if (orientation === 'horizontal') {
    return css`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: ${WHITESPACE.xlg}px;
      overflow-x: auto;
      padding-bottom: ${WHITESPACE.sm}px;
      padding-top: calc(${WHITESPACE.sm}px + ${WHITESPACE.md}px);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: ${WHITESPACE.sm}px;
        left: ${WHITESPACE.sm}px;
        right: ${WHITESPACE.sm}px;
        height: 2px;
        background-color: ${COLORS.GRAY_300};
        z-index: 0;
      }
    `;
  }

  return css`
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    padding-left: calc(${WHITESPACE.sm}px + ${WHITESPACE.md}px);

    &::before {
      content: '';
      position: absolute;
      left: ${WHITESPACE.sm}px;
      top: ${WHITESPACE.sm}px;
      bottom: ${WHITESPACE.sm}px;
      width: 2px;
      background-color: ${COLORS.GRAY_300};
      z-index: 0;
    }
  `;
};

export const timelineNodeWrapperStyles = (
  orientation: TimelineOrientation = 'vertical',
  isLast: boolean = false
) => {
  if (orientation === 'horizontal') {
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 200px;
      position: relative;
      z-index: 1;
    `;
  }

  return css`
    position: relative;
    z-index: 1;
    ${!isLast ? 'margin-bottom: 16px;' : ''}
  `;
};
