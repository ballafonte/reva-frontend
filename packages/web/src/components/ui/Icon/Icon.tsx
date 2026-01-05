import { SvgIcon } from '@mui/material';
import { iconStyles } from './Icon.styles';
import { IconProps } from './Icon.types';

export const Icon = (props: IconProps) => {
  const { size, ...rest } = props;
  const styles = iconStyles({ size });

  return <SvgIcon {...rest} sx={styles} />;
};
