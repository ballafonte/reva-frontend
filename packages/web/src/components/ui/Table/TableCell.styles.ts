import {
  COLORS,
  CONTEXT_COLORS,
  ELEMENT_COLORS,
  WHITESPACE,
  ContextType,
} from '@reva-frontend/common/theme';
import { css } from '@emotion/react';
import { TableCellProps } from './TableCell.types';

export const tableCellStyles = ({
  variant,
  context,
  transparent = false,
}: TableCellProps) => {
  const isHeader = variant === 'head';
  const contextColor = context
    ? CONTEXT_COLORS[context as ContextType]
    : undefined;
  const borderColor = contextColor ? contextColor.base : ELEMENT_COLORS.BORDER;

  // When transparent is true, use transparent backgrounds
  const headerBackgroundColor = transparent
    ? 'transparent'
    : contextColor
      ? contextColor.base
      : COLORS.GRAY_100;

  // When transparent is true and context exists, use context.text; otherwise use contrast or default
  const headerTextColor = transparent
    ? contextColor
      ? contextColor.text
      : COLORS.GRAY_600
    : contextColor
      ? contextColor.contrast
      : COLORS.GRAY_600;

  return css`
    padding: ${WHITESPACE.sm + 4}px ${WHITESPACE.md + 4}px;
    background-color: ${transparent ? 'transparent' : undefined};
    ${isHeader
      ? css`
          background-color: ${headerBackgroundColor};
          font-weight: 600;
          color: ${headerTextColor};
          box-shadow: inset 0 -1px 0 ${borderColor};
        `
      : css`
          border-bottom: 1px dotted ${borderColor};
        `}
  `;
};
