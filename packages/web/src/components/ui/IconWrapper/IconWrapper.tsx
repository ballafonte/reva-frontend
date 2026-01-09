import { SvgIcon } from '@mui/material';
import { iconWrapperStyles } from './IconWrapper.styles';
import { IconWrapperProps } from './IconWrapper.types';

export const IconWrapper = (props: IconWrapperProps) => {
  const { context, size = 'sm', ...rest } = props;
  const styles = iconWrapperStyles({ context, size });

  return <SvgIcon {...rest} sx={styles} />;
};
