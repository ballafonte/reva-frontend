import { render, screen } from '@tests/utils/test-utils';
import { ConfirmDialog } from '@/components/common/ConfirmDialog/ConfirmDialog';

describe('ConfirmDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when open is true', () => {
    render(
      <ConfirmDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Confirm Action"
        message="Are you sure?"
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(
      <ConfirmDialog
        open={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Confirm Action"
        message="Are you sure?"
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
