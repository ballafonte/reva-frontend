import { TextField } from '@mui/material';
import { inputStyles } from './Input.styles';
import { InputProps } from './Input.types';

export const Input = (props: InputProps) => {
  const { variant = 'outlined', ...rest } = props;
  const styles = inputStyles();
  return <TextField {...rest} variant={variant} sx={styles} size="small" />;
};
