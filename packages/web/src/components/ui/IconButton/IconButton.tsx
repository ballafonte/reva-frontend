import { IconButton as MuiIconButton } from '@mui/material';
import { iconButtonStyles } from './IconButton.styles';
import { IconButtonProps } from './IconButton.types';

export const IconButton = (props: IconButtonProps) => {
  const { size, circular, padding, ...rest } = props;
  const styles = iconButtonStyles({ size, circular, padding });
  return <MuiIconButton {...rest} sx={styles} />;
};
