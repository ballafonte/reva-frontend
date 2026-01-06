import { TimelineNodeProps, TimelineOrientation } from './TimelineNode.types';

export type TimelineProps = {
  nodes: TimelineNodeProps[];
  orientation?: TimelineOrientation;
};
