import { Paper } from '@mui/material';
import { panelStyles } from './Panel.styles';
import { PanelProps } from './Panel.types';

export const Panel = (props: PanelProps) => {
  const { variant = 'outlined', padding, ...rest } = props;
  const styles = panelStyles({ variant, padding, ...rest });
  return <Paper {...rest} sx={styles} elevation={0} />;
};
