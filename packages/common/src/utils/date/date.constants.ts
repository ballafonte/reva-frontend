export type BaseTimestampFormat = 'short' | 'medium' | 'long' | 'full';

export type DateFormat = BaseTimestampFormat | 'api';

export const MOMENT_DATE_TOKENS = {
  short: 'M/D/YY',
  medium: 'M/D/YYYY',
  long: 'MMMM D, YYYY',
  full: 'dddd, MMMM D, YYYY',
  api: 'YYYY-MM-DD',
} as const satisfies Record<DateFormat, string>;

export type TimeFormat = BaseTimestampFormat | 'H24';

export const MOMENT_TIME_TOKENS = {
  short: 'h:mm a',
  medium: 'hh:mm A',
  long: 'h:mm:ss a',
  full: 'hh:mm:ss A',
  H24: 'HH:mm:ss',
} as const satisfies Record<TimeFormat, string>;
