import { Box } from '@mui/material';
import { panelFooterStyles } from './PanelFooter.styles';
import { PanelFooterProps } from './PanelFooter.types';

export const PanelFooter = (props: PanelFooterProps) => {
  const { children, ...rest } = props;
  const styles = panelFooterStyles();

  return (
    <Box {...rest} sx={styles}>
      {children}
    </Box>
  );
};
