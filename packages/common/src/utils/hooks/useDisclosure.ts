import { useCallback, useRef, useState } from 'react';

export type DisclosureCloseReason =
  | 'confirm'
  | 'cancel'
  | 'backdrop'
  | 'escape'
  | 'programmatic';

export interface UseDisclosureOptions {
  initialOpen?: boolean;
  /**
   * If true, prevent closing while busy
   */
  disableCloseWhileBusy?: boolean;
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const { initialOpen = false, disableCloseWhileBusy = true } = options;

  const [open, setOpen] = useState(initialOpen);
  const [busy, setBusy] = useState(false);

  // last close reason (useful for analytics/debugging)
  const lastCloseReason = useRef<DisclosureCloseReason | null>(null);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(
    (reason: DisclosureCloseReason = 'programmatic') => {
      if (busy && disableCloseWhileBusy) return;

      lastCloseReason.current = reason;
      setOpen(false);
    },
    [busy, disableCloseWhileBusy]
  );

  const onToggle = useCallback(() => {
    if (open) {
      onClose('programmatic');
    } else {
      onOpen();
    }
  }, [open, onOpen, onClose]);

  /**
   * MUI-friendly props
   */
  const dialogProps = {
    open,
    onClose: (_event?: unknown, reason?: 'backdropClick' | 'escapeKeyDown') => {
      if (reason === 'backdropClick') {
        onClose('backdrop');
      } else if (reason === 'escapeKeyDown') {
        onClose('escape');
      } else {
        onClose('programmatic');
      }
    },
  };

  return {
    // state
    open,
    busy,
    lastCloseReason: lastCloseReason.current,

    // state setters
    setOpen,
    setBusy,

    // actions
    onOpen,
    onClose,
    onToggle,

    // adapters
    dialogProps,
  };
}
