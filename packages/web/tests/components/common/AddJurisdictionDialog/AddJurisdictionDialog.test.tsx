import { render, screen } from '@tests/utils/test-utils';
import { AddJurisdictionDialog } from '@/components/common/AddJurisdictionDialog/AddJurisdictionDialog';

describe('AddJurisdictionDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when open is true', () => {
    render(
      <AddJurisdictionDialog
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(
      <AddJurisdictionDialog
        open={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should display the dialog title', () => {
    render(
      <AddJurisdictionDialog
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Add New Jurisdiction')).toBeInTheDocument();
  });
});
