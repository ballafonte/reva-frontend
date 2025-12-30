export type ApiEndpoint = string;

export type ApiRequqestInit = {
  body?: BodyInit;
  headers?: HeadersInit;
  method?: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH' | 'UPDATE';
  query?: Record<string, string>;
};

export type ApiSuccessCbType<T> = (response: Response) => Promise<T>;

export type ApiFailureCbType = (error: unknown) => Error;

export type ApiError = {
  error: {
    code?: string;
    field?: string;
    message: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO (@ballafonte): find proper type to use here
export type APIEndpointsMap = Record<string, (_?: any) => Promise<any>>;

/**
 * TODO: jwt should not be optional. If it is being used, it should be required.
 *
 * TODO: we should not be sending jwt as a query string parameter. Remove this type when backend is change to read jwt from request headers
 */
export type AuthenticatedEndpoint = {
  jwt?: string;
};
