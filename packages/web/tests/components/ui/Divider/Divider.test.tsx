import { render } from '@tests/utils/test-utils';
import { Divider } from '@/components/ui/Divider/Divider';

describe('Divider', () => {
  it('should render', () => {
    const { container } = render(<Divider />);
    expect(container).toBeInTheDocument();
  });
});
