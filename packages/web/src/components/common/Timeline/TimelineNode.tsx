'use client';

import { Box, Typography } from '@mui/material';
import { formatDateTime } from '@reva-frontend/common/utils';
import { TimelineNodeProps } from './TimelineNode.types';
import {
  timelineNodeStyles,
  circleStyles,
  contentStyles,
} from './TimelineNode.styles';

export const TimelineNode = ({
  timestamp,
  timeFormat,
  children,
  context,
  transparent = false,
  orientation = 'vertical',
}: TimelineNodeProps) => {
  const formattedTime = formatDateTime(timestamp, timeFormat, timeFormat);
  const nodeStyles = timelineNodeStyles({ context, transparent, orientation });
  const circleStylesApplied = circleStyles({ context, orientation });

  return (
    <Box sx={nodeStyles}>
      <Box sx={circleStylesApplied} />
      <Box sx={contentStyles}>
        <Typography variant="caption" color="text.secondary">
          {formattedTime}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};
