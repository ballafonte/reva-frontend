import { Box, Typography, ListItemButton } from '@mui/material';
import { FONT_WEIGHTS } from '@common/theme';
import { MenuItemProps } from './MenuItem.types';
import { menuItemStyles } from './MenuItem.styles';

/**
 * TODO: explore refactoring this component to use ListItem component from the @/components/ui/List
 */
export const MenuItem = ({
  label,
  prefix,
  suffix,
  variant = 'ghost',
  selected = false,
  onClick,
  disabled = false,
  context = 'plain',
  size = 'md',
}: MenuItemProps) => {
  const styles = menuItemStyles({ variant, selected, disabled, context, size });

  const content = (
    <>
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
          fontWeight: selected ? FONT_WEIGHTS.bold : 400,
          color: 'inherit', // Inherit color from parent to respect hover states
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
    </>
  );

  // Use ListItemButton when onClick is provided to get MUI's button effects (ripple, etc.)
  if (onClick) {
    return (
      <ListItemButton
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        sx={[
          // Base layout styles
          {
            ...(variant !== 'outlined' && { border: 'none' }),
            outline: 'none',
            fontFamily: 'inherit',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
          // Our custom styles come last to override ListItemButton defaults
          // The emotion css styles should handle backgroundColor, color, hover states, etc.
          styles,
        ]}
      >
        {content}
      </ListItemButton>
    );
  }

  // Fallback to Box for non-interactive items
  return (
    <Box
      component="div"
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
      {content}
    </Box>
  );
};
