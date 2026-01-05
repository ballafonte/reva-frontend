import { CONTEXT_COLORS, ELEMENT_COLORS } from '@common/theme';
import { ContextType } from '@common/theme';
import { SxProps, Theme } from '@mui/material';
import { LinkProps } from './Link.types';

export const linkStyles = ({
  context,
}: Pick<LinkProps, 'context'>): SxProps<Theme> => {
  const contextColor = context
    ? CONTEXT_COLORS[context as ContextType]
    : undefined;
  const color = contextColor ? contextColor.text : ELEMENT_COLORS.LINK;

  return {
    color: color,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  };
};
