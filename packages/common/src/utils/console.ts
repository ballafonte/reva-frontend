let isConsoleEnabled = false;

export const enableConsole = (): void => {
  isConsoleEnabled = true;
};

export const disableConsole = (): void => {
  isConsoleEnabled = false;
};

export const getIsConsoleEnabled = (): boolean => isConsoleEnabled;

export const printConsole = (
  type: 'log' | 'warn' | 'error',
  ...args: unknown[]
): void => {
  if (getIsConsoleEnabled()) {
    // eslint-disable-next-line no-console
    console[type](...args);
  }
};
