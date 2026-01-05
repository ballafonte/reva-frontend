import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import { linkStyles } from './Link.styles';
import { LinkProps } from './Link.types';

export const Link = (props: LinkProps) => {
  const { context, href, children, style, sx, ...rest } = props;

  // Validate that href is provided
  if (!href) {
    throw new Error('Link component must have href prop.');
  }

  const styles = linkStyles({ context });

  // Use Next.js Link for client-side navigation
  // linkHref is guaranteed to be defined due to validation above
  return (
    <MuiLink
      {...rest}
      component={NextLink}
      href={href}
      style={style}
      sx={sx ? { ...styles, ...(sx as any) } : styles}
      underline="none"
    >
      {children}
    </MuiLink>
  );
};
