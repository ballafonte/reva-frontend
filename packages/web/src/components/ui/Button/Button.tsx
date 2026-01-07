import { Button as MuiButton, CircularProgress } from '@mui/material';
import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = (props: ButtonProps) => {
  const {
    variant = 'contained',
    fullWidth,
    isLoading,
    children,
    disabled,
    onClick,
    sx,
    ...rest
  } = props;

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

  const styles = buttonStyles({ ...props, muiVariant, sx });

  // Don't allow fullWidth for text variant (link-like buttons should be inline)
  const shouldUseFullWidth = variant === 'text' ? false : fullWidth;

  // Handle click - prevent if loading or disabled
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) {
      event.preventDefault();
      return;
    }
    onClick();
  };

  return (
    <MuiButton
      {...rest}
      variant={muiVariant}
      fullWidth={shouldUseFullWidth}
      disabled={disabled} // Only disable if explicitly disabled, not when loading
      onClick={handleClick}
      sx={styles}
      color={props.context}
    >
      {isLoading && (
        <CircularProgress
          size={16}
          sx={{
            marginRight: children ? 1 : 0,
            color: 'inherit',
          }}
        />
      )}
      {children}
    </MuiButton>
  );
};
