import { Divider as MuiDivider } from '@mui/material';
import { dividerStyles } from './Divider.styles';
import { DividerProps } from './Divider.types';

export const Divider = (props: DividerProps) => {
  const styles = dividerStyles();
  return <MuiDivider {...props} sx={styles} />;
};
