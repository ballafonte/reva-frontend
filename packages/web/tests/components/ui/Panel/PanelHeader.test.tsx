import { render, screen } from '@tests/utils/test-utils';
import { PanelHeader } from '@/components/ui/Panel/PanelHeader';

describe('PanelHeader', () => {
  it('should render panel header with title', () => {
    render(<PanelHeader title="Test Header" />);

    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });
});
