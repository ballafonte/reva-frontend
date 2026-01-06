import { Typography } from '@mui/material';
import { COLORS } from '@common/theme';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { BreadcrumbsProps } from './Breadcrumbs.types';

export const Breadcrumbs = ({ items, separator = '>' }: BreadcrumbsProps) => {
  return (
    <nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = (
            <Typography
              variant="body2"
              sx={{
                color: isLast ? COLORS.GRAY_900 : COLORS.GRAY_600,
                fontWeight: isLast ? 500 : 400,
              }}
            >
              {item.label}
            </Typography>
          );

          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              {item.href ? (
                <Link
                  href={item.href}
                  sx={{
                    color: COLORS.GRAY_600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {content}
                </Link>
              ) : item.onClick ? (
                <Button
                  onClick={item.onClick}
                  variant="text"
                  sx={{
                    color: COLORS.GRAY_600,
                    textDecoration: 'none',
                    textTransform: 'none',
                    minWidth: 'auto',
                    padding: 0,
                    '&:hover': {
                      textDecoration: 'underline',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {content}
                </Button>
              ) : (
                content
              )}
              {!isLast && (
                <span style={{ margin: '0 8px', color: COLORS.GRAY_400 }}>
                  {separator}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
