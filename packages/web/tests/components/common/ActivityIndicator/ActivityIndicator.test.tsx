import { render, screen } from '@tests/utils/test-utils';
import { ActivityIndicator } from '@/components/common/ActivityIndicator/ActivityIndicator';
import { CONTEXT_COLORS, Contexts, SIZE } from '@reva-frontend/common';

describe('ActivityIndicator', () => {
  it('should render with default props', () => {
    render(<ActivityIndicator />);

    const progressIndicator = screen.getByRole('progressbar');
    expect(progressIndicator).toBeInTheDocument();
  });

  it('should render with default size (xlg)', () => {
    render(<ActivityIndicator />);

    const progressIndicator = screen.getByRole('progressbar');
    expect(progressIndicator).toHaveAttribute(
      'style',
      expect.stringContaining(`${SIZE.xlg}px`)
    );
  });

  it('should render with default context (primary)', () => {
    render(<ActivityIndicator />);

    const progressIndicator = screen.getByRole('progressbar');
    const container = progressIndicator.closest('[class*="MuiBox"]');
    expect(container).toBeInTheDocument();
  });

  describe('size prop', () => {
    it('should render with string size "xsm"', () => {
      render(<ActivityIndicator size="xsm" />);

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('[class*="MuiBox"]');
      expect(container).toHaveStyle({
        width: `${SIZE.xsm}px`,
        height: `${SIZE.xsm}px`,
      });
    });

    it('should render with string size "sm"', () => {
      render(<ActivityIndicator size="sm" />);

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('[class*="MuiBox"]');
      expect(container).toHaveStyle({
        width: `${SIZE.sm}px`,
        height: `${SIZE.sm}px`,
      });
    });

    it('should render with string size "md"', () => {
      render(<ActivityIndicator size="md" />);

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('[class*="MuiBox"]');
      expect(container).toHaveStyle({
        width: `${SIZE.md}px`,
        height: `${SIZE.md}px`,
      });
    });

    it('should render with string size "lg"', () => {
      render(<ActivityIndicator size="lg" />);

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('[class*="MuiBox"]');
      expect(container).toHaveStyle({
        width: `${SIZE.lg}px`,
        height: `${SIZE.lg}px`,
      });
    });

    it('should render with string size "xlg"', () => {
      render(<ActivityIndicator size="xlg" />);

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('[class*="MuiBox"]');
      expect(container).toHaveStyle({
        width: `${SIZE.xlg}px`,
        height: `${SIZE.xlg}px`,
      });
    });

    it('should render with numeric size', () => {
      const numericSize = 100;
      render(<ActivityIndicator size={numericSize} />);

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('[class*="MuiBox"]');
      expect(container).toHaveStyle({
        width: `${numericSize}px`,
        height: `${numericSize}px`,
      });
    });
  });

  describe('context prop', () => {
    it('should render with primary context', () => {
      render(<ActivityIndicator context={Contexts.PRIMARY} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.PRIMARY].base,
      });
    });

    it('should render with secondary context', () => {
      render(<ActivityIndicator context={Contexts.SECONDARY} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.SECONDARY].base,
      });
    });

    it('should render with tertiary context', () => {
      render(<ActivityIndicator context={Contexts.TERTIARY} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.TERTIARY].base,
      });
    });

    it('should render with success context', () => {
      render(<ActivityIndicator context={Contexts.SUCCESS} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.SUCCESS].base,
      });
    });

    it('should render with warning context', () => {
      render(<ActivityIndicator context={Contexts.WARNING} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.WARNING].base,
      });
    });

    it('should render with danger context', () => {
      render(<ActivityIndicator context={Contexts.DANGER} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.DANGER].base,
      });
    });

    it('should render with info context', () => {
      render(<ActivityIndicator context={Contexts.INFO} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.INFO].base,
      });
    });

    it('should render with plain context', () => {
      render(<ActivityIndicator context={Contexts.PLAIN} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.PLAIN].base,
      });
    });
  });

  describe('containerProps prop', () => {
    it('should apply containerProps to the container Box', () => {
      const containerProps = {
        'data-testid': 'custom-container',
        className: 'custom-class',
      };

      render(<ActivityIndicator containerProps={containerProps} />);

      const container = screen.getByTestId('custom-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('custom-class');
    });

    it('should apply sx from containerProps', () => {
      const containerProps = {
        sx: { backgroundColor: 'red' },
      };

      render(<ActivityIndicator containerProps={containerProps} />);

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('[class*="MuiBox"]');
      expect(container).toHaveStyle({ backgroundColor: 'red' });
    });
  });

  describe('sx prop', () => {
    it('should apply sx prop to CircularProgress', () => {
      render(<ActivityIndicator sx={{ opacity: 0.5 }} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({ opacity: '0.5' });
    });

    it('should merge sx prop with context color', () => {
      render(
        <ActivityIndicator context={Contexts.PRIMARY} sx={{ opacity: 0.5 }} />
      );

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.PRIMARY].base,
        opacity: '0.5',
      });
    });
  });

  describe('CircularProgress props', () => {
    it('should pass thickness prop to CircularProgress', () => {
      render(<ActivityIndicator thickness={4} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toBeInTheDocument();
      // Note: MUI doesn't expose thickness as a style, but it affects the rendering
      // This test ensures the prop is passed without errors
    });

    it('should render with determinate variant', () => {
      render(<ActivityIndicator variant="determinate" value={50} />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toBeInTheDocument();
      expect(progressIndicator).toHaveAttribute('aria-valuenow', '50');
    });

    it('should render with indeterminate variant (default)', () => {
      render(<ActivityIndicator />);

      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toBeInTheDocument();
      // Indeterminate variant doesn't have aria-valuenow
      expect(progressIndicator).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('container styles', () => {
    it('should render container with correct flex styles', () => {
      render(<ActivityIndicator />);

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('[class*="MuiBox"]');
      expect(container).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      });
    });
  });

  describe('prop combinations', () => {
    it('should render with all props combined', () => {
      const containerProps = {
        className: 'test-container',
      };

      render(
        <ActivityIndicator
          size="md"
          context={Contexts.SUCCESS}
          thickness={4}
          variant="determinate"
          value={60}
          sx={{ opacity: 0.8 }}
          containerProps={containerProps}
        />
      );

      const progressIndicator = screen.getByRole('progressbar');
      const container = progressIndicator.closest('.test-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveStyle({
        width: `${SIZE.md}px`,
        height: `${SIZE.md}px`,
      });

      expect(progressIndicator).toBeInTheDocument();
      expect(progressIndicator).toHaveAttribute('aria-valuenow', '60');
      expect(progressIndicator).toHaveStyle({
        color: CONTEXT_COLORS[Contexts.SUCCESS].base,
        opacity: '0.8',
      });
    });
  });
});
