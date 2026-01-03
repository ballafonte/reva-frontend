import { act, renderHook } from '@testing-library/react';
import { useDisclosure } from '@common/utils/hooks/useDisclosure';

describe('useDisclosure', () => {
  it('should initialize as closed by default', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.open).toBe(false);
    expect(result.current.busy).toBe(false);
  });

  it('should initialize as open when initialOpen is true', () => {
    const { result } = renderHook(() => useDisclosure({ initialOpen: true }));

    expect(result.current.open).toBe(true);
  });

  it('should open when onOpen is called', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.open).toBe(true);
  });

  it('should close when onClose is called', () => {
    const { result } = renderHook(() => useDisclosure({ initialOpen: true }));

    act(() => {
      result.current.onClose();
    });

    expect(result.current.open).toBe(false);
  });

  it('should toggle open/closed state', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.open).toBe(false);
  });

  it('should not close when busy and disableCloseWhileBusy is true', () => {
    const { result } = renderHook(() =>
      useDisclosure({ initialOpen: true, disableCloseWhileBusy: true })
    );

    act(() => {
      result.current.setBusy(true);
    });

    act(() => {
      result.current.onClose();
    });

    expect(result.current.open).toBe(true);
  });

  it('should close when busy if disableCloseWhileBusy is false', () => {
    const { result } = renderHook(() =>
      useDisclosure({ initialOpen: true, disableCloseWhileBusy: false })
    );

    act(() => {
      result.current.setBusy(true);
    });

    act(() => {
      result.current.onClose();
    });

    expect(result.current.open).toBe(false);
  });

  it('should track last close reason', () => {
    const { result } = renderHook(() => useDisclosure({ initialOpen: true }));

    act(() => {
      result.current.onClose('confirm');
    });

    expect(result.current.lastCloseReason).toBe('confirm');
  });

  it('should provide dialogProps adapter', () => {
    const { result } = renderHook(() => useDisclosure({ initialOpen: true }));

    expect(result.current.dialogProps).toHaveProperty('open');
    expect(result.current.dialogProps).toHaveProperty('onClose');
    expect(result.current.dialogProps.open).toBe(true);
  });

  it('should handle backdrop click in dialogProps', () => {
    const { result } = renderHook(() => useDisclosure({ initialOpen: true }));

    act(() => {
      result.current.dialogProps.onClose(undefined, 'backdropClick');
    });

    expect(result.current.open).toBe(false);
    expect(result.current.lastCloseReason).toBe('backdrop');
  });

  it('should handle escape key in dialogProps', () => {
    const { result } = renderHook(() => useDisclosure({ initialOpen: true }));

    act(() => {
      result.current.dialogProps.onClose(undefined, 'escapeKeyDown');
    });

    expect(result.current.open).toBe(false);
    expect(result.current.lastCloseReason).toBe('escape');
  });

  it('should handle programmatic close in dialogProps', () => {
    const { result } = renderHook(() => useDisclosure({ initialOpen: true }));

    act(() => {
      result.current.dialogProps.onClose();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.lastCloseReason).toBe('programmatic');
  });

  it('should allow setting busy state', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.setBusy(true);
    });

    expect(result.current.busy).toBe(true);

    act(() => {
      result.current.setBusy(false);
    });

    expect(result.current.busy).toBe(false);
  });

  it('should allow setting open state directly', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.setOpen(true);
    });

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });

    expect(result.current.open).toBe(false);
  });
});
