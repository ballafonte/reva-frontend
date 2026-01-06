import { ReactNode } from 'react';
import { BaseTimestampFormat } from '@common/utils/date';
import { ContextType } from '@common/theme';

export type TimelineOrientation = 'vertical' | 'horizontal';

export type TimelineNodeProps = {
  timestamp: string; // ISO8601 timestamp
  timeFormat: BaseTimestampFormat;
  children: ReactNode;
  context?: ContextType;
  transparent?: boolean;
  orientation?: TimelineOrientation;
};
