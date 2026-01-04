import { ELEMENT_COLORS } from '@common/theme';
import { css } from '@emotion/react';

export const dividerStyles = () => {
  return css`
    border-color: ${ELEMENT_COLORS.BORDER};
    border-width: 1px;
  `;
};
