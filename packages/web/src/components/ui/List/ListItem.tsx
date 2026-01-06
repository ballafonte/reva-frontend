import {
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  type ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material';
import { listItemStyles } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';

export const ListItem = (props: ListItemProps) => {
  const { selected = false, onClick, disabled, ref, onToggle, ...rest } = props;
  const styles = listItemStyles({ selected, disabled, ...rest });

  // Use ListItemButton if onClick or selected props are provided
  if (onClick || selected) {
    // Extract only props that are compatible with ListItemButton
    const buttonProps: Partial<MuiListItemButtonProps> = {
      selected,
      onClick: onClick as React.MouseEventHandler<HTMLDivElement> | undefined,
      disabled,
      sx: styles,
    };

    // Only spread safe props (exclude onToggle, ref, and other ListItem-specific props)
    const safeProps = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) => !['onToggle', 'ref', 'component'].includes(key)
      )
    ) as Partial<MuiListItemButtonProps>;

    return (
      <MuiListItem disablePadding ref={ref}>
        <MuiListItemButton {...safeProps} {...buttonProps} />
      </MuiListItem>
    );
  }

  return <MuiListItem {...rest} ref={ref} sx={styles} />;
};
