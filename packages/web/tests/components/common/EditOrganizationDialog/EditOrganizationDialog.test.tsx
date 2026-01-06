import { render, screen } from '@tests/utils/test-utils';
import { EditOrganizationDialog } from '@/components/common/EditOrganizationDialog/EditOrganizationDialog';

describe('EditOrganizationDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when open is true', () => {
    render(
      <EditOrganizationDialog
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={{ name: 'Test Org' }}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(
      <EditOrganizationDialog
        open={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={{ name: 'Test Org' }}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
