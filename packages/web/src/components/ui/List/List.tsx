import { List as MuiList } from '@mui/material';
import { listStyles } from './List.styles';
import { ListProps } from './List.types';

export const List = (props: ListProps) => {
  const styles = listStyles();
  return <MuiList {...props} sx={styles} />;
};
