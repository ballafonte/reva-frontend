import { Tab as MuiTab } from '@mui/material';
import { tabStyles } from './Tab.styles';
import { TabProps } from './Tab.types';

export const Tab = (props: TabProps) => {
  const { context = 'primary', ...rest } = props;
  const styles = tabStyles({ context });
  return <MuiTab {...rest} sx={styles} />;
};
