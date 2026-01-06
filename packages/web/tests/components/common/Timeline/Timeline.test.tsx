import { render, screen } from '@tests/utils/test-utils';
import { Timeline } from '@/components/common/Timeline/Timeline';

describe('Timeline', () => {
  const mockNodes = [
    {
      timestamp: '2024-01-01T00:00:00Z',
      timeFormat: 'short' as const,
      children: <div>Node 1</div>,
    },
    {
      timestamp: '2024-01-02T00:00:00Z',
      timeFormat: 'short' as const,
      children: <div>Node 2</div>,
    },
  ];

  it('should render timeline nodes', () => {
    render(<Timeline nodes={mockNodes} />);

    expect(screen.getByText('Node 1')).toBeInTheDocument();
    expect(screen.getByText('Node 2')).toBeInTheDocument();
  });

  it('should render empty timeline', () => {
    render(<Timeline nodes={[]} />);
    expect(document.body).toBeInTheDocument();
  });
});
