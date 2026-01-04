import { Tabs as MuiTabs } from '@mui/material';
import { tabsStyles } from './Tabs.styles';
import { TabsProps } from './Tabs.types';

export const Tabs = (props: TabsProps) => {
  const styles = tabsStyles();
  return <MuiTabs {...props} sx={styles} />;
};
