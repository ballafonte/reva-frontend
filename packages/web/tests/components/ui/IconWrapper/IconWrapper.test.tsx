import { render, screen } from '@tests/utils/test-utils';
import { IconWrapper } from '@/components/ui/IconWrapper/IconWrapper';

describe('IconWrapper', () => {
  it('should render icon wrapper with children', () => {
    render(
      <IconWrapper>
        <span>Icon</span>
      </IconWrapper>
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
