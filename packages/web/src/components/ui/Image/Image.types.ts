import { ImgHTMLAttributes } from 'react';
import { Size } from '@reva-frontend/common/theme';

export type ImageVariant = 'square' | 'rounded' | 'circle';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'style'> & {
  variant?: ImageVariant;
  size?: Size | number;
  alt: string;
};
