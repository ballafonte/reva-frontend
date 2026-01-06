import { Box, Typography } from '@mui/material';
import { MenuItemProps } from './MenuItem.types';
import { menuItemStyles } from './MenuItem.styles';

export const MenuItem = ({
  label,
  prefix,
  suffix,
  variant = 'ghost',
  selected = false,
  onClick,
  disabled = false,
  context,
  size = 'md',
}: MenuItemProps) => {
  const styles = menuItemStyles({ variant, selected, disabled, context, size });

  return (
    <Box
      component={onClick ? 'button' : 'div'}
      onClick={disabled ? undefined : onClick}
      sx={[
        styles,
        {
          ...(variant !== 'outlined' && { border: 'none' }),
          outline: 'none',
          fontFamily: 'inherit',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
    >
      {prefix && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {prefix}
        </Box>
      )}
      <Typography
        variant="body2"
        sx={{
          flex: 1,
          fontWeight: selected ? 500 : 400,
        }}
      >
        {label}
      </Typography>
      {suffix && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {suffix}
        </Box>
      )}
    </Box>
  );
};
