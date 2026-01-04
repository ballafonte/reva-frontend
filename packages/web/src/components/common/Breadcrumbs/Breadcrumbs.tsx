import { Link, Typography } from '@mui/material';
import { COLORS } from '@common/theme';
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
              {item.href || item.onClick ? (
                <Link
                  href={item.href}
                  onClick={item.onClick}
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
