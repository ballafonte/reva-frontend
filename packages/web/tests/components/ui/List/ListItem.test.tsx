import { render, screen } from '@tests/utils/test-utils';
import { ListItem } from '@/components/ui/List/ListItem';

describe('ListItem', () => {
  it('should render list item with children', () => {
    render(
      <ListItem>
        <span>List Item Content</span>
      </ListItem>
    );

    expect(screen.getByText('List Item Content')).toBeInTheDocument();
  });
});
