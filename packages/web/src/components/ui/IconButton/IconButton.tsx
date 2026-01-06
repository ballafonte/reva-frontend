import { IconButton as MuiIconButton } from '@mui/material';
import { IconWrapper } from '../IconWrapper';
import { iconButtonStyles } from './IconButton.styles';
import { IconButtonProps } from './IconButton.types';

export const IconButton = (props: IconButtonProps) => {
  const {
    size = 'sm',
    circular,
    padding,
    component,
    context,
    variant = 'ghost',
    ...rest
  } = props;
  const styles = iconButtonStyles({
    size,
    circular,
    padding,
    variant,
    context,
  });
  return (
    <MuiIconButton {...rest} sx={styles} color={context}>
      <IconWrapper component={component} size={size} />
    </MuiIconButton>
  );
};
