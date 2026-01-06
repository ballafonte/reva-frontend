import { render, screen } from '@tests/utils/test-utils';
import { Input } from '@/components/ui/Input/Input';

describe('Input', () => {
  it('should render input field', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<Input label="Test Input" />);

    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<Input placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });
});
