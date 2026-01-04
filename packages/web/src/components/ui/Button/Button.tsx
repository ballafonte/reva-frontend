import { Button as MuiButton } from '@mui/material';
import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = (props: ButtonProps) => {
  const styles = buttonStyles(props);
  return <MuiButton {...props} sx={styles} color={props.context} />;
};
