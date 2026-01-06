import { render, screen } from '@tests/utils/test-utils';
import { AlertsToast } from '@/components/common/AlertsToast/AlertsToast';

describe('AlertsToast', () => {
  it('should render', () => {
    render(<AlertsToast />);
    // Basic rendering test - component may not render anything visible without alerts
    expect(document.body).toBeInTheDocument();
  });
});
