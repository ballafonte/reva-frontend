import { render, screen } from '@tests/utils/test-utils';
import { Sidebar } from '@/components/common/Sidebar/Sidebar';

describe('Sidebar', () => {
  const mockMenuItems = [
    { label: 'Home', path: '/', icon: <span>Home</span> },
    { label: 'About', path: '/about', icon: <span>About</span> },
  ];

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render menu items', () => {
    render(
      <Sidebar
        menuItems={mockMenuItems}
        selectedPath="/"
        onClick={mockOnClick}
      />
    );

    // Get all instances and check they exist
    const homeItems = screen.getAllByText('Home');
    expect(homeItems.length).toBeGreaterThan(0);
    const aboutItems = screen.getAllByText('About');
    expect(aboutItems.length).toBeGreaterThan(0);
  });
});
