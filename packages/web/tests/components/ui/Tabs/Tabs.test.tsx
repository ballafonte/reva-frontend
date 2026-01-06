import { render, screen } from '@tests/utils/test-utils';
import { Tabs } from '@/components/ui/Tabs/Tabs';
import { Tab } from '@/components/ui/Tabs/Tab';

describe('Tabs', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render tabs with children', () => {
    render(
      <Tabs value={0} onChange={mockOnChange}>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
      </Tabs>
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });
});
