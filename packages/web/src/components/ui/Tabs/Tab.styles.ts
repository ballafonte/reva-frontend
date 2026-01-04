import { COLORS } from '@common/theme';
import { css } from '@emotion/react';

export const tabStyles = () => {
  return css`
    text-transform: none;
    min-height: auto;
    padding: 12px 16px;
    color: ${COLORS.GRAY_700};
    font-weight: 500;

    &.Mui-selected {
      color: ${COLORS.BLUE};
    }

    &:hover {
      color: ${COLORS.BLUE};
    }
  `;
};
