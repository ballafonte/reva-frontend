import { CONTEXT_COLORS } from './colors/colors';
import { COMPONENT_FONT_SIZES, FONT_WEIGHTS } from './typography';
import { WHITESPACE } from './whitespace';

export const INPUT_MESSAGE_STYLES = {
  INVALID_FEEDBACK: {
    color: CONTEXT_COLORS.danger.text,
    fontSize: COMPONENT_FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHTS.medium,
    marginTop: WHITESPACE.xsm,
    width: '100%',
  },
} as const;
