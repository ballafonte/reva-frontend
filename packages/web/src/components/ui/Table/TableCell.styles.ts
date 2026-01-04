import { COLORS, ELEMENT_COLORS, WHITESPACE } from '@common/theme';
import { css } from '@emotion/react';
import { TableCellProps } from './TableCell.types';

export const tableCellStyles = ({ variant }: TableCellProps) => {
  const isHeader = variant === 'head';

  return css`
    padding: ${WHITESPACE.sm}px ${WHITESPACE.md}px;
    border-bottom: 1px solid ${ELEMENT_COLORS.BORDER};
    ${isHeader &&
    css`
      background-color: ${COLORS.GRAY_100};
      font-weight: 600;
      color: ${COLORS.GRAY_900};
    `}
  `;
};
