import { render, screen } from '@tests/utils/test-utils';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';

describe('Breadcrumbs', () => {
  it('should render with items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Page', href: '/page' },
    ];

    render(<Breadcrumbs items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Page')).toBeInTheDocument();
  });

  it('should render empty breadcrumbs', () => {
    render(<Breadcrumbs items={[]} />);
    expect(document.body).toBeInTheDocument();
  });
});
