import { COLORS } from '@common/theme';
import { css } from '@emotion/react';
import { TableRowProps } from './TableRow.types';

export const tableRowStyles = ({ hover, selected }: TableRowProps) => {
  return css`
    ${selected &&
    css`
      background-color: ${COLORS.GRAY_100};
    `}
    ${hover &&
    css`
      &:hover {
        background-color: ${COLORS.GRAY_100};
        cursor: pointer;
      }
    `}
  `;
};
