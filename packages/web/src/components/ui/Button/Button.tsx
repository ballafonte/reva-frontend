import { Button as MuiButton } from '@mui/material';
import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = (props: ButtonProps) => {
  const { variant, ...rest } = props;
  const styles = buttonStyles(props);

  // Map 'ghost' to MUI's 'text' variant, and handle new 'text' variant
  let muiVariant: 'contained' | 'outlined' | 'text' | undefined;
  if (variant === 'ghost') {
    muiVariant = 'text';
  } else if (variant === 'text') {
    // For the new 'text' variant, we'll use MUI's 'text' but override styles
    muiVariant = 'text';
  } else {
    muiVariant = variant;
  }

  return (
    <MuiButton
      {...rest}
      variant={muiVariant}
      sx={styles}
      color={props.context}
    />
  );
};
