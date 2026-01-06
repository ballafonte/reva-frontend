import { render, screen } from '@tests/utils/test-utils';
import { TableRow } from '@/components/ui/Table/TableRow';

describe('TableRow', () => {
  it('should render table row with children', () => {
    render(
      <table>
        <tbody>
          <TableRow>
            <td>Row Content</td>
          </TableRow>
        </tbody>
      </table>
    );

    expect(screen.getByText('Row Content')).toBeInTheDocument();
  });
});
