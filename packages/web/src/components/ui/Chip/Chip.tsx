import {
  CONTEXT_COLORS,
  WHITESPACE,
  type ContextType,
} from '@reva-frontend/common/theme';
import {
  Chip as MuiChip,
  ChipProps as MuiChipProps,
  SxProps,
  Theme,
  Box,
} from '@mui/material';
import type { ChipProps } from './Chip.types';

export const Chip = (props: ChipProps) => {
  const {
    label,
    context = 'primary',
    prefix,
    suffix,
    size = 'medium',
    variant,
    ...rest
  } = props;

  // Extract sx from rest if it exists (for merging with our context styles)
  const { sx, ...muiRest } = rest as typeof rest & { sx?: SxProps<Theme> };

  // Get context color for styling
  const contextColor =
    CONTEXT_COLORS[context as ContextType] || CONTEXT_COLORS.primary;

  // Apply context-based colors via sx prop
  const contextStyles: SxProps<Theme> =
    variant === 'outlined'
      ? {
          border: `1px solid ${contextColor.base}`,
          backgroundColor: 'transparent',
          color: contextColor.base,
        }
      : {
          backgroundColor: contextColor.base,
          color: contextColor.contrast,
        };

  // Merge sx prop if provided
  const mergedSx: SxProps<Theme> = sx
    ? ([contextStyles, sx] as SxProps<Theme>)
    : contextStyles;

  // Create custom label with flexbox layout for prefix, label, and suffix
  const customLabel = (
    <Box
      component="span"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: WHITESPACE.sm,
      }}
    >
      {prefix && (
        <Box
          component="span"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {prefix}
        </Box>
      )}
      {label}
      {suffix && (
        <Box
          component="span"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {suffix}
        </Box>
      )}
    </Box>
  );

  // Map our props to MUI Chip props
  const muiChipProps: MuiChipProps = {
    label: customLabel,
    size: size,
    variant: variant === 'outlined' ? 'outlined' : 'filled',
    sx: mergedSx,
    ...muiRest,
  };

  return <MuiChip {...muiChipProps} />;
};
