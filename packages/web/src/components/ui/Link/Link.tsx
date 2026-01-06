import React, { useRef, useEffect, useMemo } from 'react';
import NextLinkBase, { LinkProps as NextLinkProps } from 'next/link';
import { SxProps, Theme, useTheme } from '@mui/material';
import { linkStyles } from './Link.styles';
import { LinkProps } from './Link.types';

/**
 * NextLink component that forwards refs and applies MUI styles.
 * Uses Next.js Link's modern API (without legacyBehavior).
 * Next.js Link IS an anchor element, so we use a ref callback to forward refs
 * and apply styles directly to it. This ensures only ONE anchor exists.
 */
const NextLink = React.forwardRef<
  HTMLAnchorElement,
  NextLinkProps & {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
    style?: React.CSSProperties;
  }
>(function NextLink(props, ref) {
  const { href, sx, style, children, ...other } = props;
  const theme = useTheme();
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Resolve sx styles - memoize to avoid re-computation
  const resolvedStyles = useMemo(() => {
    const styles = sx ? (Array.isArray(sx) ? sx : [sx]) : [];
    return styles.reduce((acc, styleObj) => {
      if (typeof styleObj === 'function') {
        const resolved = styleObj(theme);
        return { ...acc, ...(resolved as React.CSSProperties) };
      } else if (typeof styleObj === 'object' && styleObj !== null) {
        return { ...acc, ...(styleObj as React.CSSProperties) };
      }
      return acc;
    }, {} as React.CSSProperties);
  }, [sx, theme]);

  const combinedStyle = useMemo(
    () => ({ ...resolvedStyles, ...style }),
    [resolvedStyles, style]
  );

  // Forward ref and apply styles to Next.js Link (which IS an anchor)
  useEffect(() => {
    // In Next.js 13+, Link IS an anchor element
    // Find the anchor element that Next.js Link renders
    const anchor = linkRef.current?.querySelector('a') as HTMLAnchorElement;
    if (anchor) {
      // Forward the ref
      if (ref) {
        if (typeof ref === 'function') {
          ref(anchor);
        } else {
          ref.current = anchor;
        }
      }
      // Apply styles
      Object.assign(anchor.style, combinedStyle);
    }
  }, [ref, combinedStyle]);

  // In Next.js 13+, Link IS an anchor element, but it doesn't accept refs directly
  // Wrap it in a non-anchor element (span) to locate the anchor it renders
  // Styles are applied via useEffect to the actual anchor element
  return (
    <span ref={linkRef} style={{ display: 'inline' }}>
      <NextLinkBase href={href} {...other}>
        {children}
      </NextLinkBase>
    </span>
  );
});

export const Link = ({
  context,
  href,
  children,
  style,
  sx,
  ...rest
}: LinkProps) => {
  // Validate that href is provided
  if (!href) {
    throw new Error('Link component must have href prop.');
  }

  const styles = linkStyles({ context });
  // Merge styles properly - MUI sx prop supports arrays for merging
  const combinedSx = sx ? ([styles, sx] as SxProps<Theme>) : styles;

  // Use Next.js Link directly with MUI styles applied
  // This avoids nested anchor tags (MUI Link would render an <a> inside Next.js Link's <a>)
  return (
    <NextLink
      href={href}
      sx={combinedSx}
      style={style}
      {...(rest as Omit<
        LinkProps,
        'href' | 'children' | 'context' | 'style' | 'sx'
      >)}
    >
      {children}
    </NextLink>
  );
};
