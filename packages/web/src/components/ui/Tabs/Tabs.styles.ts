import { COLORS } from '@common/theme';
import { css } from '@emotion/react';

export const tabsStyles = () => {
  return css`
    border-bottom: 1px solid ${COLORS.GRAY_300};
    min-height: auto;

    .MuiTabs-indicator {
      background-color: ${COLORS.BLUE};
      height: 2px;
    }
  `;
};
