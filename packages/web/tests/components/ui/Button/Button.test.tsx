import { render, screen } from '@tests/utils/test-utils';
import { Button } from '@/components/ui/Button/Button';

describe('Button', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with text', () => {
    render(<Button onClick={mockOnClick}>Click Me</Button>);

    expect(
      screen.getByRole('button', { name: 'Click Me' })
    ).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <Button onClick={mockOnClick} disabled>
        Click Me
      </Button>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render loading state', () => {
    render(
      <Button onClick={mockOnClick} isLoading>
        Click Me
      </Button>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
