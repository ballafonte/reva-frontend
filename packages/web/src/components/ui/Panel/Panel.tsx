import { Paper } from '@mui/material';
import { PanelHeader } from './PanelHeader';
import { PanelFooter } from './PanelFooter';
import { panelStyles } from './Panel.styles';
import { PanelProps } from './Panel.types';

export const Panel = (props: PanelProps) => {
  const { variant = 'outlined', header, footer, children, ...rest } = props;
  const styles = panelStyles({ variant, ...rest });

  return (
    <Paper {...rest} sx={styles} elevation={0}>
      {header && <PanelHeader {...header} />}
      {children}
      {footer && <PanelFooter {...footer} />}
    </Paper>
  );
};
