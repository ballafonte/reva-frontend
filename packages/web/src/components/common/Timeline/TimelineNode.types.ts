import { ReactNode } from 'react';
import { BaseTimestampFormat } from '@reva-frontend/common/utils';
import { ContextType } from '@reva-frontend/common/theme';

export type TimelineOrientation = 'vertical' | 'horizontal';

export type TimelineNodeProps = {
  timestamp: string; // ISO8601 timestamp
  timeFormat: BaseTimestampFormat;
  children: ReactNode;
  context?: ContextType;
  transparent?: boolean;
  orientation?: TimelineOrientation;
};
