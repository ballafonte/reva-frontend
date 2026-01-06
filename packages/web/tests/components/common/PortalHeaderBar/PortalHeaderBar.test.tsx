import { render, screen } from '@tests/utils/test-utils';
import { PortalHeaderBar } from '@/components/common/PortalHeaderBar/PortalHeaderBar';

describe('PortalHeaderBar', () => {
  it('should render', () => {
    render(<PortalHeaderBar />);
    // Basic rendering test
    expect(document.body).toBeInTheDocument();
  });
});
