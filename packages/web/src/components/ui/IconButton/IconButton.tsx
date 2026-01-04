import { IconButton as MuiIconButton } from '@mui/material';
import { iconButtonStyles } from './IconButton.styles';
import { IconButtonProps } from './IconButton.types';

export const IconButton = (props: IconButtonProps) => {
  const styles = iconButtonStyles();
  return <MuiIconButton {...props} sx={styles} />;
};
