import { WHITESPACE } from '@common/theme';
import { css } from '@emotion/react';
import { ButtonProps } from './Button.types';

export const buttonStyles = ({ size }: ButtonProps) => {
  const borderRadius =
    size === 'small'
      ? WHITESPACE.sm
      : size === 'medium'
        ? WHITESPACE.sm
        : WHITESPACE.md;

  return css`
    border-radius: ${borderRadius}px;
  `;
};
