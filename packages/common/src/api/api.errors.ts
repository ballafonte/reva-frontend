import type { components } from '@revassurance/api/openapi';

/**
 * ErrorResponse type from the API
 */
export type ErrorResponse = components['schemas']['ErrorResponse'];

/**
 * Generic API error class that includes status code and error response
 * Can be used by any endpoint, not just auth
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errorResponse?: ErrorResponse;

  constructor(
    message: string,
    statusCode: number,
    errorResponse?: ErrorResponse
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorResponse = errorResponse;
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * Extract ErrorResponse from an API response
 * This is a generic utility that can be used by any endpoint
 */
export async function extractErrorResponse(
  response: Response
): Promise<ErrorResponse | null> {
  try {
    const text = await response.text();
    if (!text) {
      return null;
    }
    const parsed = JSON.parse(text);
    // Check if it matches the ErrorResponse structure (has a message field)
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof parsed.message === 'string'
    ) {
      return parsed as ErrorResponse;
    }
    return null;
  } catch {
    // If parsing fails, return null
    return null;
  }
}

/**
 * Create an ApiError from an API response
 * Generic utility that extracts ErrorResponse and creates an appropriate error
 */
export async function createApiErrorFromResponse(
  response: Response,
  defaultMessage: string
): Promise<ApiError> {
  const errorResponse = await extractErrorResponse(response);

  // Use the message from ErrorResponse if available, otherwise use default
  const message = errorResponse?.message || defaultMessage;

  return new ApiError(message, response.status, errorResponse || undefined);
}
