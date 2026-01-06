// Mock implementation of next/image for Jest tests
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...props}
      style={{
        ...props.style,
        objectFit: fill ? 'cover' : undefined,
      }}
    />
  );
}
