import { render, screen } from '@tests/utils/test-utils';
import { EditJurisdictionDialog } from '@/components/common/EditJurisdictionDialog/EditJurisdictionDialog';

describe('EditJurisdictionDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when open is true', () => {
    render(
      <EditJurisdictionDialog
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={{ name: 'Test', nameAbbreviation: 'TST' }}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(
      <EditJurisdictionDialog
        open={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={{ name: 'Test', nameAbbreviation: 'TST' }}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
