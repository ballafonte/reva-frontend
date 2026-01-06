import { render, screen } from '@tests/utils/test-utils';
import { MainLayout } from '@/components/common/MainLayout/MainLayout';

describe('MainLayout', () => {
  it('should render children when authenticated', () => {
    render(
      <MainLayout>
        <div>Layout Content</div>
      </MainLayout>,
      { isAuthenticated: true }
    );

    expect(screen.getByText('Layout Content')).toBeInTheDocument();
  });

  it('should render children when not authenticated', () => {
    render(
      <MainLayout>
        <div>Layout Content</div>
      </MainLayout>,
      { isAuthenticated: false }
    );

    expect(screen.getByText('Layout Content')).toBeInTheDocument();
  });
});
