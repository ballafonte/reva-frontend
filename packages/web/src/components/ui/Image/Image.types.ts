import { ImgHTMLAttributes } from 'react';
import { Size, WhitespaceSize } from '@common/theme';

export type ImageVariant = 'square' | 'rounded' | 'circle';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'style'> & {
  variant?: ImageVariant;
  size?: number | string | Size | WhitespaceSize;
  alt: string;
};
