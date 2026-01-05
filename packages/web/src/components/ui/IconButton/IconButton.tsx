import { IconButton as MuiIconButton } from '@mui/material';
import { IconWrapper } from '../IconWrapper';
import { iconButtonStyles } from './IconButton.styles';
import { IconButtonProps } from './IconButton.types';

export const IconButton = (props: IconButtonProps) => {
  const { size = 'sm', circular, padding, component, ...rest } = props;
  const styles = iconButtonStyles({ size, circular, padding });
  return (
    <MuiIconButton {...rest} sx={styles}>
      <IconWrapper component={component} size={size} />
    </MuiIconButton>
  );
};
