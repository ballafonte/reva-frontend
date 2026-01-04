import { Button as MuiButton, ButtonProps } from '@mui/material';
import { buttonStyles } from './Button.styles';

export const Button = (props: ButtonProps) => {
  return <MuiButton {...props} style={buttonStyles} size="small" />;
};
