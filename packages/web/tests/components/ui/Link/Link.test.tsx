import { render, screen } from '@tests/utils/test-utils';
import { Link } from '@/components/ui/Link/Link';

describe('Link', () => {
  it('should render link with text', () => {
    render(<Link href="/test">Test Link</Link>);

    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should render external link', () => {
    render(<Link href="https://example.com">External Link</Link>);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
