import { Tab as MuiTab } from '@mui/material';
import { tabStyles } from './Tab.styles';
import { TabProps } from './Tab.types';

export const Tab = (props: TabProps) => {
  const styles = tabStyles();
  return <MuiTab {...props} sx={styles} />;
};
