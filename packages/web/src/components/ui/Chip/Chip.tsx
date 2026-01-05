import { Box } from '@mui/material';
import { chipStyles } from './Chip.styles';
import { ChipProps } from './Chip.types';

export const Chip = (props: ChipProps) => {
  const { label, context, prefix, suffix, size, variant, ...rest } = props;
  const styles = chipStyles({ context, size, variant });

  return (
    <Box component="span" sx={styles} {...rest}>
      {prefix && (
        <Box
          component="span"
          sx={{
            marginRight: '4px',
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
          sx={{
            marginLeft: '4px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {suffix}
        </Box>
      )}
    </Box>
  );
};
