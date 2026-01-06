import { render, screen } from '@tests/utils/test-utils';
import { MenuItem } from '@/components/common/Menu/MenuItem';

describe('MenuItem', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render menu item with label', () => {
    render(<MenuItem label="Test Menu" onClick={mockOnClick} />);

    expect(screen.getByText('Test Menu')).toBeInTheDocument();
  });

  it('should render with prefix', () => {
    render(
      <MenuItem
        label="Test Menu"
        onClick={mockOnClick}
        prefix={<span>Icon</span>}
      />
    );

    expect(screen.getByText('Test Menu')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
