import { SvgIcon } from '@mui/material';
import { iconWrapperStyles } from './IconWrapper.styles';
import { IconWrapperProps } from './IconWrapper.types';

export const IconWrapper = (props: IconWrapperProps) => {
  const { size = 'sm', ...rest } = props;
  const styles = iconWrapperStyles({ size });

  return <SvgIcon {...rest} sx={styles} />;
};
