import { COLORS, ELEMENT_COLORS, WHITESPACE } from '@common/theme';
import { css } from '@emotion/react';

export const inputStyles = () => {
  return css`
    .MuiOutlinedInput-root {
      border-radius: ${WHITESPACE.sm}px;

      fieldset {
        border-color: ${ELEMENT_COLORS.BORDER};
      }

      &:hover fieldset {
        border-color: ${COLORS.GRAY_400};
      }

      &.Mui-focused fieldset {
        border-color: ${COLORS.BLUE};
        border-width: 1px;
      }

      &.Mui-error fieldset {
        border-color: ${COLORS.RED};
      }
    }

    .MuiFilledInput-root {
      border-radius: ${WHITESPACE.sm}px ${WHITESPACE.sm}px 0 0;
      background-color: ${COLORS.GRAY_100};

      &:hover {
        background-color: ${COLORS.GRAY_200};
      }

      &.Mui-focused {
        background-color: ${COLORS.GRAY_100};
      }
    }

    .MuiInput-root {
      &::before {
        border-bottom-color: ${ELEMENT_COLORS.BORDER};
      }

      &:hover:not(.Mui-disabled)::before {
        border-bottom-color: ${COLORS.GRAY_400};
      }

      &.Mui-focused::after {
        border-bottom-color: ${COLORS.BLUE};
      }
    }
  `;
};
