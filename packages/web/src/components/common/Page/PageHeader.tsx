'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import { IconButton } from '@/components/ui';
import { type PageHeaderProps } from './Page.types';

export function PageHeader({ title, onBackClick, suffix }: PageHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      {onBackClick && (
        <IconButton
          aria-label="go back"
          component={ArrowBackIcon}
          onClick={onBackClick}
        />
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {suffix}
      </Box>
    </Box>
  );
}
