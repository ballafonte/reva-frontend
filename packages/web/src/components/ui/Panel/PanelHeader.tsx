import { Box, Typography } from '@mui/material';
import { panelHeaderStyles } from './PanelHeader.styles';
import { PanelHeaderProps } from './PanelHeader.types';

export const PanelHeader = (props: PanelHeaderProps) => {
  const { title, prefix, suffix, children, ...rest } = props;
  const styles = panelHeaderStyles();

  return (
    <Box sx={styles} {...rest}>
      {prefix && <Box sx={{ marginRight: 'auto' }}>{prefix}</Box>}
      {title && (
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      )}
      {children}
      {suffix && <Box sx={{ marginLeft: 'auto' }}>{suffix}</Box>}
    </Box>
  );
};
