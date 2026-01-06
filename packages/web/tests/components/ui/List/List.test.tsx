import { render, screen } from '@tests/utils/test-utils';
import { List } from '@/components/ui/List/List';

describe('List', () => {
  it('should render list with children', () => {
    render(
      <List>
        <li>Item 1</li>
        <li>Item 2</li>
      </List>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
