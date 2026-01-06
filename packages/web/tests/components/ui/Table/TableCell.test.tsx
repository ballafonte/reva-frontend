import { render, screen } from '@tests/utils/test-utils';
import { TableCell } from '@/components/ui/Table/TableCell';

describe('TableCell', () => {
  it('should render table cell with children', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Cell Content</TableCell>
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByText('Cell Content')).toBeInTheDocument();
  });
});
