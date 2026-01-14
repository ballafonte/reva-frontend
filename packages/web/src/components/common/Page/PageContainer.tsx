'use client';

import { Container, Box } from '@mui/material';
import { Panel } from '@/components/ui';
import { type PageContainerProps } from './Page.types';
import { PageHeader } from './PageHeader';

export function PageContainer({
  children,
  headerProps,
  maxWidth = 'md',
}: PageContainerProps) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ my: 4 }}>
        <Panel padding="xlg">
          {headerProps && <PageHeader {...headerProps} />}
          {children}
        </Panel>
      </Box>
    </Container>
  );
}
