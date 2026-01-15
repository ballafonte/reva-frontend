import { render, screen } from '@tests/utils/test-utils';
import { PanelFooter } from '@/components/ui/Panel';

describe('PanelFooter', () => {
  it('should render panel footer with children', () => {
    render(<PanelFooter>Footer Content</PanelFooter>);

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});
