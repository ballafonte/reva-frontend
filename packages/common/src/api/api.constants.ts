export const API_STATUS_CODES = {
  SUCCESS: {
    OK: 200,
  },
  CLIENT_ERROR: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    REQUEST_TIMEOUT: 408,
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },
} as const;

export const API_MANDATORY_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
} as const;

export const API_DEFAULT_HEADERS: Record<string, string> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
} as const;

export const MS_1_MINUTE = '60000';

export const MS_20_MINUTES = '12000000';

export const MS_1_MONTH = '2592000000';

export const API_DEFAULT_TOKEN_TIMEOUT = MS_20_MINUTES;

export const API_DEFAULT_TOKEN_T_MINUS = MS_1_MINUTE;
