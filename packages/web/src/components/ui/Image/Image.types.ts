import { ImgHTMLAttributes } from 'react';

export type ImageVariant = 'square' | 'rounded' | 'circle';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'style'> & {
  variant?: ImageVariant;
  size?: number | string;
  alt: string;
};
