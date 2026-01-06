import { render, screen } from '@tests/utils/test-utils';
import { TimelineNode } from '@/components/common/Timeline/TimelineNode';

describe('TimelineNode', () => {
  it('should render node with children', () => {
    render(
      <TimelineNode timestamp="2024-01-01T00:00:00Z" timeFormat="short">
        <div>Test Node</div>
      </TimelineNode>
    );

    expect(screen.getByText('Test Node')).toBeInTheDocument();
  });

  it('should render node with children and description', () => {
    render(
      <TimelineNode timestamp="2024-01-01T00:00:00Z" timeFormat="short">
        <div>Test Node</div>
        <div>Test Description</div>
      </TimelineNode>
    );

    expect(screen.getByText('Test Node')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
