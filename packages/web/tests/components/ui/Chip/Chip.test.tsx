import { render, screen } from '@tests/utils/test-utils';
import { Chip } from '@/components/ui/Chip/Chip';

describe('Chip', () => {
  it('should render chip with label', () => {
    render(<Chip label="Test Chip" />);

    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('should render chip with prefix', () => {
    render(<Chip label="Test Chip" prefix={<span>Icon</span>} />);

    expect(screen.getByText('Test Chip')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
