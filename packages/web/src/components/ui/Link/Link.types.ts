import { ContextType } from '@common/theme';
import { LinkProps as MuiLinkProps } from '@mui/material';

export type LinkProps = {
  context?: ContextType;
  href?: string;
  children: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?:
    | 'noopener noreferrer'
    | 'noreferrer'
    | 'opener'
    | 'nofollow'
    | 'noindex'
    | 'noarchive'
    | 'nosnippet'
    | 'noimageindex'
    | 'nocache'
    | 'noindex, nofollow'
    | 'noindex, noarchive'
    | 'noindex, noimageindex'
    | 'noindex, noarchive, noimageindex'
    | 'noindex, noarchive, noimageindex, nofollow'
    | 'noindex, noarchive, noimageindex, nofollow, noindex, noarchive, noimageindex, nofollow';
  style?: React.CSSProperties;
  sx?: MuiLinkProps['sx'];
};
