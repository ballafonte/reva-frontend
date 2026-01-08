import { Box, CircularProgress } from '@mui/material';
import { CONTEXT_COLORS, Contexts, SIZE } from '@reva-frontend/common';
import type { FC } from 'react';
import { ActivityIndicatorProps } from './ActivityIndicator.types';

export const ActivityIndicator: FC<ActivityIndicatorProps> = ({
  containerProps: { sx: containerSx, ...containerProps } = {},
  context = Contexts.PRIMARY,
  size: sizeProp = 'xlg',
  sx,
  ...props
}) => {
  const size = typeof sizeProp === 'number' ? sizeProp : SIZE[sizeProp];
  const color = CONTEXT_COLORS[context];
  return (
    <Box
      {...containerProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: `${size}px`,
        justifyContent: 'center',
        width: `${size}px`,
        ...containerSx,
      }}
    >
      <CircularProgress
        size={size}
        sx={{ ...sx, color: color.base }}
        {...props}
      />
    </Box>
  );
};
