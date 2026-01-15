import {
  CONTEXT_COLORS,
  SIZE,
  type ContextType,
  type Size,
} from '@reva-frontend/common/theme';
import { Box, SxProps, Theme } from '@mui/material';
import type { BadgeProps } from './Badge.types';

export const Badge = (props: BadgeProps) => {
  const {
    badgeContent,
    children,
    context = 'primary',
    size: sizeProp = 'xsm',
    positionX = 'right',
    positionY = 'top',
    onClick,
    ...rest
  } = props;

  // Get context color for styling
  const contextColor =
    CONTEXT_COLORS[context as ContextType] || CONTEXT_COLORS.primary;

  const isSizeNumber = typeof sizeProp === 'number';

  const size = SIZE[sizeProp as Size] || sizeProp;

  // Get badge size in pixels
  const badgeSize = isSizeNumber ? size : Math.round(size * 1.5);

  // Calculate font size (approximately 83% of badge size to maintain current 10px for 12px)
  const fontSize = Math.round(badgeSize * 0.83);

  // Calculate positioning offsets (half of badge size to overlap edge)
  const offset = `-${badgeSize / 2}px`;

  // Build badge positioning styles
  const badgePositionStyles: SxProps<Theme> = {
    position: 'absolute',
    ...(positionY === 'top' ? { top: offset } : { bottom: offset }),
    ...(positionX === 'right' ? { right: offset } : { left: offset }),
  };

  // Badge container styles
  const badgeStyles: SxProps<Theme> = {
    ...badgePositionStyles,
    minWidth: `${badgeSize}px`,
    height: `${badgeSize}px`,
    // borderRadius: '50%',
    borderRadius: badgeSize / 2,
    px: 0.5,
    backgroundColor: contextColor.base,
    color: contextColor.contrast,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${fontSize}px`,
    lineHeight: 1,
    cursor: onClick ? 'pointer' : 'default',
    ...(onClick && {
      '&:hover': {
        opacity: 0.8,
      },
    }),
  };

  // Wrapper container styles
  const wrapperStyles: SxProps<Theme> = {
    position: 'relative',
    display: 'inline-flex',
  };

  // Render badge content
  const renderBadgeContent = () => {
    if (typeof badgeContent === 'string') {
      return badgeContent;
    }
    return badgeContent;
  };

  return (
    <Box sx={wrapperStyles} {...rest}>
      {children}
      <Box
        sx={badgeStyles}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
      >
        {renderBadgeContent()}
      </Box>
    </Box>
  );
};
