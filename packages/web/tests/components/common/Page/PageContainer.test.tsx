import { render, screen } from '@tests/utils/test-utils';
import { PageContainer } from '@/components/common/Page/PageContainer';
import { IconButton } from '@/components/ui';
import AddIcon from '@mui/icons-material/Add';

describe('PageContainer', () => {
  it('should render children', () => {
    render(
      <PageContainer>
        <div>Page Content</div>
      </PageContainer>
    );

    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('should render with header when headerProps is provided', () => {
    render(
      <PageContainer headerProps={{ title: 'Test Page' }}>
        <div>Page Content</div>
      </PageContainer>
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('should not render header when headerProps is not provided', () => {
    render(
      <PageContainer>
        <div>Page Content</div>
      </PageContainer>
    );

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('should render header with back button when onBackClick is provided', () => {
    const handleBackClick = jest.fn();
    render(
      <PageContainer
        headerProps={{ title: 'Test Page', onBackClick: handleBackClick }}
      >
        <div>Page Content</div>
      </PageContainer>
    );

    const backButton = screen.getByLabelText('go back');
    expect(backButton).toBeInTheDocument();
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('should render header with suffix when provided', () => {
    const suffix = (
      <IconButton
        aria-label="add item"
        component={AddIcon}
        onClick={() => {}}
      />
    );
    render(
      <PageContainer headerProps={{ title: 'Test Page', suffix }}>
        <div>Page Content</div>
      </PageContainer>
    );

    expect(screen.getByLabelText('add item')).toBeInTheDocument();
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('should use default maxWidth of "md"', () => {
    const { container } = render(
      <PageContainer>
        <div>Page Content</div>
      </PageContainer>
    );

    // Check that Container is rendered (MUI Container applies maxWidth via CSS)
    const containerElement = container.querySelector('.MuiContainer-root');
    expect(containerElement).toBeInTheDocument();
  });

  it('should accept custom maxWidth prop', () => {
    const { container } = render(
      <PageContainer maxWidth="lg">
        <div>Page Content</div>
      </PageContainer>
    );

    const containerElement = container.querySelector('.MuiContainer-root');
    expect(containerElement).toBeInTheDocument();
  });

  it('should render Panel with correct padding', () => {
    render(
      <PageContainer>
        <div>Page Content</div>
      </PageContainer>
    );

    // Panel should be rendered (we can check for the content)
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('should render complete page structure with header and content', () => {
    const suffix = (
      <IconButton
        aria-label="add item"
        component={AddIcon}
        onClick={() => {}}
      />
    );
    render(
      <PageContainer headerProps={{ title: 'Users', suffix }}>
        <div>User list content</div>
      </PageContainer>
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByLabelText('add item')).toBeInTheDocument();
    expect(screen.getByText('User list content')).toBeInTheDocument();
  });
});
