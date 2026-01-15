import { render, screen, fireEvent } from '@tests/utils/test-utils';
import { Badge } from '@/components/ui/Badge/Badge';
import { CONTEXT_COLORS, SIZE } from '@reva-frontend/common/theme';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

describe('Badge', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render badge with string badgeContent', () => {
    render(
      <Badge badgeContent="5" context="danger">
        <NotificationsIcon />
      </Badge>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render badge with MUI icon badgeContent', () => {
    const { container } = render(
      <Badge badgeContent={<CloseIcon />} context="danger">
        <NotificationsIcon />
      </Badge>
    );

    // The CloseIcon should be rendered (MUI icons render as SVG)
    const svgElements = container.querySelectorAll('svg');
    // Should have at least 2 SVGs: one for the anchor icon and one for the badge icon
    expect(svgElements.length).toBeGreaterThanOrEqual(2);
  });

  it('should render anchor element (children) correctly', () => {
    render(
      <Badge badgeContent="5" context="danger">
        <Box data-testid="anchor-element">Anchor</Box>
      </Badge>
    );

    expect(screen.getByTestId('anchor-element')).toBeInTheDocument();
    expect(screen.getByText('Anchor')).toBeInTheDocument();
  });

  it('should apply correct context color', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger">
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    expect(badgeElement).toHaveStyle({
      backgroundColor: CONTEXT_COLORS.danger.base,
      color: CONTEXT_COLORS.danger.contrast,
    });
  });

  it('should default to primary context when not specified', () => {
    const { container } = render(
      <Badge badgeContent="5">
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    expect(badgeElement).toHaveStyle({
      backgroundColor: CONTEXT_COLORS.primary.base,
      color: CONTEXT_COLORS.primary.contrast,
    });
  });

  it('should position badge at top-right by default', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger">
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    // Badge size calculation: Math.round(SIZE.xsm * 1.5) = 18, offset = -9px
    const badgeSize = Math.round(SIZE.xsm * 1.5);
    const expectedOffset = `-${badgeSize / 2}px`;
    expect(badgeElement).toHaveStyle({
      position: 'absolute',
      top: expectedOffset,
      right: expectedOffset,
    });
  });

  it('should position badge at top-left when positionX is left', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger" positionX="left">
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    // Badge size calculation: Math.round(SIZE.xsm * 1.5) = 18, offset = -9px
    const badgeSize = Math.round(SIZE.xsm * 1.5);
    const expectedOffset = `-${badgeSize / 2}px`;
    expect(badgeElement).toHaveStyle({
      position: 'absolute',
      top: expectedOffset,
      left: expectedOffset,
    });
  });

  it('should position badge at bottom-right when positionY is bottom', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger" positionY="bottom">
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    // Badge size calculation: Math.round(SIZE.xsm * 1.5) = 18, offset = -9px
    const badgeSize = Math.round(SIZE.xsm * 1.5);
    const expectedOffset = `-${badgeSize / 2}px`;
    expect(badgeElement).toHaveStyle({
      position: 'absolute',
      bottom: expectedOffset,
      right: expectedOffset,
    });
  });

  it('should position badge at bottom-left when both positionX and positionY are set', () => {
    const { container } = render(
      <Badge
        badgeContent="5"
        context="danger"
        positionX="left"
        positionY="bottom"
      >
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    // Badge size calculation: Math.round(SIZE.xsm * 1.5) = 18, offset = -9px
    const badgeSize = Math.round(SIZE.xsm * 1.5);
    const expectedOffset = `-${badgeSize / 2}px`;
    expect(badgeElement).toHaveStyle({
      position: 'absolute',
      bottom: expectedOffset,
      left: expectedOffset,
    });
  });

  it('should handle click events when onClick is provided', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger" onClick={mockOnClick}>
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute and onClick)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    expect(badgeElement).toHaveAttribute('role', 'button');
    expect(badgeElement).toHaveAttribute('tabIndex', '0');

    fireEvent.click(badgeElement as HTMLElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should handle keyboard events when onClick is provided', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger" onClick={mockOnClick}>
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute and onClick)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box

    fireEvent.keyDown(badgeElement as HTMLElement, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(badgeElement as HTMLElement, { key: ' ' });
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it('should not have click handler attributes when onClick is not provided', () => {
    render(
      <Badge badgeContent="5" context="danger">
        <NotificationsIcon />
      </Badge>
    );

    const badgeElement = screen.getByText('5').parentElement;
    expect(badgeElement).not.toHaveAttribute('role', 'button');
    expect(badgeElement).not.toHaveAttribute('tabIndex', '0');
  });

  it('should have wrapper container with correct positioning styles', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger">
        <NotificationsIcon />
      </Badge>
    );

    // The wrapper should be the first Box with position relative
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({
      position: 'relative',
      display: 'inline-flex',
    });
  });

  it('should render badge with default size (xsm = 12x12px)', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger">
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    // Badge size calculation: Math.round(SIZE.xsm * 1.5) = Math.round(12 * 1.5) = 18
    const badgeSize = Math.round(SIZE.xsm * 1.5);
    expect(badgeElement).toHaveStyle({
      minWidth: `${badgeSize}px`,
      height: `${badgeSize}px`,
    });
    // borderRadius is set as badgeSize / 2 in the component
    // Verify it's a circular shape (borderRadius should be approximately half the size)
    const computedStyle = window.getComputedStyle(badgeElement as HTMLElement);
    const borderRadius = parseFloat(computedStyle.borderRadius);
    expect(borderRadius).toBeGreaterThan(0);
    // The borderRadius should create a rounded shape (at least some rounding)
    expect(borderRadius).toBeGreaterThanOrEqual(badgeSize / 4);
  });

  it('should render badge with custom size', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger" size="sm">
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    // Badge size calculation: Math.round(SIZE.sm * 1.5) = Math.round(24 * 1.5) = 36
    const badgeSize = Math.round(SIZE.sm * 1.5);
    expect(badgeElement).toHaveStyle({
      minWidth: `${badgeSize}px`,
      height: `${badgeSize}px`,
    });
    // borderRadius is set as badgeSize / 2 in the component
    // Verify it's a circular shape (borderRadius should be approximately half the size)
    const computedStyle = window.getComputedStyle(badgeElement as HTMLElement);
    const borderRadius = parseFloat(computedStyle.borderRadius);
    expect(borderRadius).toBeGreaterThan(0);
    // The borderRadius should create a rounded shape (at least some rounding)
    expect(borderRadius).toBeGreaterThanOrEqual(badgeSize / 4);
  });

  it('should center badge content with flexbox', () => {
    const { container } = render(
      <Badge badgeContent="5" context="danger">
        <NotificationsIcon />
      </Badge>
    );

    // Select the badge element (second Box with position absolute)
    const badgeElements = container.querySelectorAll('[class*="MuiBox-root"]');
    const badgeElement = badgeElements[1]; // Badge is the second Box
    expect(badgeElement).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });
});
