import { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { inputStyles } from './Input.styles';
import { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { variant = 'outlined', prefix, suffix, context, ...rest } = props;
  const styles = inputStyles({ context });

  // Map prefix to startAdornment and suffix to endAdornment
  const startAdornment = prefix ? (
    <InputAdornment position="start">{prefix}</InputAdornment>
  ) : undefined;

  const endAdornment = suffix ? (
    <InputAdornment position="end">{suffix}</InputAdornment>
  ) : undefined;

  return (
    <TextField
      {...rest}
      ref={ref}
      variant={variant}
      sx={styles}
      size="small"
      InputProps={{
        startAdornment,
        endAdornment,
      }}
    />
  );
});

Input.displayName = 'Input';
