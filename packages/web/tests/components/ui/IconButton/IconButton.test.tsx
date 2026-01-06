import { render, screen } from '@tests/utils/test-utils';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import SearchIcon from '@mui/icons-material/Search';

describe('IconButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render icon button', () => {
    render(<IconButton onClick={mockOnClick} component={SearchIcon} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <IconButton onClick={mockOnClick} component={SearchIcon} disabled />
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
