import { ImgHTMLAttributes } from 'react';
import { WhitespaceSize } from '@common/theme';

export type ImageVariant = 'square' | 'rounded' | 'circle';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'style'> & {
  variant?: ImageVariant;
  size?: number | string | WhitespaceSize;
  alt: string;
};
