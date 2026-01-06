import { Box } from '@mui/material';
import { TimelineProps } from './Timeline.types';
import { TimelineNode } from './TimelineNode';
import { timelineStyles, timelineNodeWrapperStyles } from './Timeline.styles';

export const Timeline = ({
  nodes,
  orientation = 'vertical',
}: TimelineProps) => {
  const containerStyles = timelineStyles(orientation);

  return (
    <Box sx={containerStyles}>
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1;
        const wrapperStyles = timelineNodeWrapperStyles(orientation, isLast);

        return (
          <Box key={index} sx={wrapperStyles}>
            <TimelineNode {...node} orientation={orientation} />
          </Box>
        );
      })}
    </Box>
  );
};
