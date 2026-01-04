import { ListItem as MuiListItem } from '@mui/material';
import { listItemStyles } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';

export const ListItem = (props: ListItemProps) => {
  const { selected = false, ...rest } = props;
  const styles = listItemStyles({ selected, ...rest });
  return <MuiListItem {...rest} selected={selected} sx={styles} />;
};
