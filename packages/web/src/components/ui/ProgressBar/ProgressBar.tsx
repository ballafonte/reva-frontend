import { Typography, Box } from '@mui/material';
import { progressBarStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = (props: ProgressBarProps) => {
  const {
    value,
    variant = 'determinate',
    context = 'primary',
    height = 8,
    showLabel = false,
    label,
    ...rest
  } = props;
  const styles = progressBarStyles({ context, height });

  const clampedValue =
    value !== undefined ? Math.min(Math.max(value, 0), 100) : 0;

  return (
    <Box {...rest}>
      {(showLabel || label) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">{label || `${clampedValue}%`}</Typography>
          {showLabel && label && (
            <Typography variant="body2">{clampedValue}%</Typography>
          )}
        </Box>
      )}
      <Box sx={styles}>
        {variant === 'determinate' ? (
          <Box
            className="progress-bar-fill"
            sx={{ width: `${clampedValue}%` }}
          />
        ) : (
          <Box
            className="progress-bar-fill"
            sx={{
              width: '30%',
              animation: 'indeterminate 1.5s ease-in-out infinite',
            }}
          />
        )}
      </Box>
    </Box>
  );
};
