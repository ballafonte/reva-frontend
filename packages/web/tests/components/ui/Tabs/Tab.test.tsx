import { render, screen } from '@tests/utils/test-utils';
import { Tab } from '@/components/ui/Tabs/Tab';

describe('Tab', () => {
  it('should render tab with label', () => {
    render(<Tab label="Test Tab" />);

    expect(screen.getByText('Test Tab')).toBeInTheDocument();
  });
});
