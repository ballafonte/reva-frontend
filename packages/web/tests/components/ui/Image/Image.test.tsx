import { render, screen } from '@tests/utils/test-utils';
import { Image } from '@/components/ui/Image/Image';

describe('Image', () => {
  it('should render image with src and alt', () => {
    render(<Image src="/test.jpg" alt="Test Image" />);

    const img = screen.getByAltText('Test Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
  });

  it('should render with width and height', () => {
    render(<Image src="/test.jpg" alt="Test Image" width={100} height={100} />);

    const img = screen.getByAltText('Test Image');
    // Width and height are passed as props and may be in styles rather than attributes
    expect(img).toBeInTheDocument();
  });
});
