import { COLORS, WHITESPACE } from '@common/theme';
import { css } from '@emotion/react';
import { ListItemProps } from './ListItem.types';

export const listItemStyles = ({ selected }: ListItemProps) => {
  return css`
    padding: ${WHITESPACE.sm}px ${WHITESPACE.md}px;
    ${selected &&
    css`
      background-color: ${COLORS.GRAY_100};
    `}
    &:hover {
      background-color: ${COLORS.GRAY_100};
    }
  `;
};
