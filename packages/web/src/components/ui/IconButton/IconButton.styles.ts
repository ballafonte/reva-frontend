import { COLORS, WHITESPACE } from '@common/theme';
import { css } from '@emotion/react';

export const iconButtonStyles = () => {
  return css`
    border-radius: ${WHITESPACE.sm}px;
    padding: ${WHITESPACE.sm}px;

    &:hover {
      background-color: ${COLORS.GRAY_100};
    }

    &:active {
      background-color: ${COLORS.GRAY_200};
    }
  `;
};
