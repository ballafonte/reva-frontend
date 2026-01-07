import { Paper } from '@mui/material';
import { PanelHeader } from './PanelHeader';
import { PanelFooter } from './PanelFooter';
import { panelStyles } from './Panel.styles';
import { PanelProps } from './Panel.types';

export const Panel = ({
  header,
  footer,
  children,
  padding,
  sx,
  variant = 'outlined',
  ...rest
}: PanelProps) => {
  const styles = panelStyles({ padding, sx, variant });

  return (
    <Paper {...rest} sx={styles} elevation={0}>
      {header && <PanelHeader {...header} />}
      {children}
      {footer && <PanelFooter {...footer} />}
    </Paper>
  );
};
