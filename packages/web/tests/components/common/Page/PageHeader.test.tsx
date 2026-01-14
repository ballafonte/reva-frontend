import { render, screen, fireEvent } from '@tests/utils/test-utils';
import { PageHeader } from '@/components/common/Page/PageHeader';
import { IconButton } from '@/components/ui';
import AddIcon from '@mui/icons-material/Add';

describe('PageHeader', () => {
  it('should render title', () => {
    render(<PageHeader title="Test Page" />);

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Test Page'
    );
  });

  it('should render back button when onBackClick is provided', () => {
    const handleBackClick = jest.fn();
    render(<PageHeader title="Test Page" onBackClick={handleBackClick} />);

    const backButton = screen.getByLabelText('go back');
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(handleBackClick).toHaveBeenCalledTimes(1);
  });

  it('should not render back button when onBackClick is not provided', () => {
    render(<PageHeader title="Test Page" />);

    expect(screen.queryByLabelText('go back')).not.toBeInTheDocument();
  });

  it('should render suffix when provided', () => {
    const suffix = (
      <IconButton aria-label="add item" component={AddIcon} onClick={() => {}} />
    );
    render(<PageHeader title="Test Page" suffix={suffix} />);

    expect(screen.getByLabelText('add item')).toBeInTheDocument();
  });

  it('should render both back button and suffix', () => {
    const handleBackClick = jest.fn();
    const suffix = (
      <IconButton aria-label="add item" component={AddIcon} onClick={() => {}} />
    );
    render(
      <PageHeader
        title="Test Page"
        onBackClick={handleBackClick}
        suffix={suffix}
      />
    );

    expect(screen.getByLabelText('go back')).toBeInTheDocument();
    expect(screen.getByLabelText('add item')).toBeInTheDocument();
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('should render title with correct variant', () => {
    render(<PageHeader title="Test Page" />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Test Page');
  });
});
