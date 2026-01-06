import { render, screen } from '@tests/utils/test-utils';
import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar';

describe('ProgressBar', () => {
  it('should render progress bar', () => {
    const { container } = render(<ProgressBar value={50} />);

    expect(container.querySelector('.progress-bar-fill')).toBeInTheDocument();
  });

  it('should render with value', () => {
    const { container } = render(<ProgressBar value={75} />);

    const fill = container.querySelector('.progress-bar-fill');
    expect(fill).toBeInTheDocument();
    expect(fill).toHaveStyle({ width: '75%' });
  });
});
