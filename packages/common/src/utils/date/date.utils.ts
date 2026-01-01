import moment, { type Moment } from 'moment';
import {
  DateFormat,
  MOMENT_DATE_TOKENS,
  TimeFormat,
  MOMENT_TIME_TOKENS,
} from './date.constants';

/**
 * Ensures a datetime string is marked as UTC. If no timezone info is present, appends 'Z'.
 */
export const ensureUtcString = (dateStr: string): string => {
  if (!dateStr) return dateStr;

  // Regex to detect if there's already a 'Z' or an offset like +05:00 / -07:00
  const hasTimezone = /Z$|[+-]\d{2}:\d{2}$/.test(dateStr);

  return hasTimezone ? dateStr : `${dateStr}Z`;
};

/**
 * Ensures a datetime object is UTC.
 */
export const ensureUtcMoment = (date?: Date | Moment | string): Moment => {
  if (!date) return moment();
  if (typeof date === 'string') {
    const dateStr = ensureUtcString(date);
    return moment.utc(dateStr);
  } else {
    const dateStr = ensureUtcString(date.toISOString());
    return moment.utc(dateStr);
  }
};

export const formatDate = (
  date: Date | Moment | string,
  format: DateFormat = 'medium'
): string => {
  const momentObject = ensureUtcMoment(date);
  return momentObject.format(MOMENT_DATE_TOKENS[format]);
};

export const formatLocalDate = (
  date: Date | Moment | string,
  format: DateFormat = 'medium'
): string => {
  const momentObject = ensureUtcMoment(date);
  return momentObject.local().format(MOMENT_DATE_TOKENS[format]);
};

export const formatTime = (
  time: Date | Moment | string,
  format: TimeFormat = 'medium'
): string => {
  const momentObject = ensureUtcMoment(time);
  return momentObject.format(MOMENT_TIME_TOKENS[format]);
};

export const formatLocalTime = (
  time: Date | Moment | string,
  format: TimeFormat = 'medium'
): string => {
  const momentObject = ensureUtcMoment(time);
  return momentObject.local().format(MOMENT_TIME_TOKENS[format]);
};

export const formatDateTime = (
  date: Date | Moment | string,
  dateFormat: DateFormat = 'medium',
  timeFormat: TimeFormat = 'medium'
): string => {
  return `${formatDate(date, dateFormat)} ${formatTime(date, timeFormat)}`;
};

export const formatLocalDateTime = (
  date: Date | Moment | string,
  format: DateFormat = 'medium'
): string => {
  const momentObject = ensureUtcMoment(date);
  return momentObject.local().format(MOMENT_DATE_TOKENS[format]);
};

export const formatDateTimeLocal = (
  date: Date | Moment | string,
  dateFormat: DateFormat = 'medium',
  timeFormat: TimeFormat = 'medium'
): string => {
  return `${formatLocalDateTime(date, dateFormat)} ${formatLocalTime(date, timeFormat)}`;
};

export const formatMilliseconds = (ms: number, showMs?: boolean): string => {
  const duration = moment.duration(ms);
  return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}${
    showMs ? `:${duration.milliseconds()}` : ''
  }`;
};

/**
 * Returns true if 2 dates are within 24 hours of each other
 */
export const isLessThan24Hours = (
  reference: Date | Moment | string,
  base?: Date | Moment | string
) => {
  const baseMoment = ensureUtcMoment(base);
  const referenceMoment = ensureUtcMoment(reference);

  const hoursDiff = baseMoment.diff(referenceMoment, 'hours');

  return hoursDiff < 24;
};

/**
 * Returns the best format to use for relative time
 */
export const getFromNowFormat = (timestamp: Date | Moment | string) => {
  const now = moment();
  const momentObject = ensureUtcMoment(timestamp);

  // If less than 60 minutes, show relative time
  const minutesDiff = Math.abs(now.diff(momentObject, 'minutes'));
  if (minutesDiff < 60) {
    return 'relative';
  }

  // If less than 24 hours, show time
  const hoursDiff = Math.abs(now.diff(momentObject, 'hours'));
  if (hoursDiff < 24) {
    return MOMENT_TIME_TOKENS['short'];
  }

  // If less than 7 days, show day of the week
  const daysDiff = Math.abs(now.diff(momentObject, 'days'));
  if (daysDiff < 7) {
    return 'ddd';
  }

  // If less than 30 days, show month and day
  const monthsDiff = Math.abs(now.diff(momentObject, 'months'));
  if (monthsDiff < 1) {
    return 'MMMM D';
  }

  // Otherwise, show full date
  return MOMENT_DATE_TOKENS['medium'];
};

/**
 * Formats a date/time to a relative time string (e.g. "2 hours ago") or a formatted date string (e.g. "January 1")
 *
 * TODO (@ballafonte): Create language type for `lng`
 */
export const formatRelativeTime = (
  value: Date | Moment | string,
  lng: string
) => {
  const token = getFromNowFormat(value);
  if (token === 'relative') {
    return ensureUtcMoment(value).locale(lng).fromNow();
  }
  return ensureUtcMoment(value).locale(lng).format(token);
};

/**
 * Formats two dates to display a datetime range
 */
export const formatDateTimeRange = (
  start: Date | Moment | string,
  end: Date | Moment | string,
  format: DateFormat = 'medium',
  timeFormat: TimeFormat = 'medium'
) => {
  const startDate = formatDate(start, format);
  const endDate = formatDate(end, format);
  if (startDate === endDate) {
    return `${startDate}, ${formatTime(start, timeFormat)} – ${formatTime(end, timeFormat)}`;
  }
  return `${formatDate(start, format)} ${formatTime(start, timeFormat)} – ${formatDate(
    end,
    format
  )} ${formatTime(end, timeFormat)}`;
};

/**
 * Formats two dates to display a datetime range
 */
export const formatLocalDateTimeRange = (
  start: Date | Moment | string,
  end: Date | Moment | string,
  format: DateFormat = 'medium',
  timeFormat: TimeFormat = 'medium'
) => {
  const startDate = formatLocalDate(start, format);
  const endDate = formatLocalDate(end, format);
  if (startDate === endDate) {
    return `${startDate}, ${formatLocalTime(start, timeFormat)} – ${formatLocalTime(
      end,
      timeFormat
    )}`;
  }
  return `${formatLocalDate(start, format)} ${formatLocalTime(
    start,
    timeFormat
  )} – ${formatLocalDate(end, format)} ${formatLocalTime(end, timeFormat)}`;
};
