import { TextField, InputAdornment } from '@mui/material';
import { inputStyles } from './Input.styles';
import { InputProps } from './Input.types';

export const Input = (props: InputProps) => {
  const { variant = 'outlined', prefix, suffix, ...rest } = props;
  const styles = inputStyles();

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
      variant={variant}
      sx={styles}
      size="small"
      InputProps={{
        startAdornment,
        endAdornment,
      }}
    />
  );
};
