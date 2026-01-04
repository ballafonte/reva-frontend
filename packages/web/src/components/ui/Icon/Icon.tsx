import { SvgIcon } from '@mui/material';
import { iconStyles } from './Icon.styles';
import { IconProps } from './Icon.types';

export const Icon = (props: IconProps) => {
  const styles = iconStyles();
  return <SvgIcon {...props} sx={styles} />;
};
