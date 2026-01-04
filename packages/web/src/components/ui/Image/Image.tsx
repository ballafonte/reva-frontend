import { Box } from '@mui/material';
import { imageStyles } from './Image.styles';
import { ImageProps } from './Image.types';

export const Image = (props: ImageProps) => {
  const { variant, size, ...rest } = props;
  const styles = imageStyles({ variant, size });
  return <Box component="img" {...rest} sx={styles} />;
};
