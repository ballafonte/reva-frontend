export type ApiEndpoint = string;

export type ApiRequqestInit = {
  body?: BodyInit;
  headers?: HeadersInit;
  method?: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH' | 'UPDATE';
  query?: Record<string, string>;
};

export type ApiSuccessCbType<T> = (response: Response) => Promise<T>;

export type ApiFailureCbType = (error: unknown) => Error | Promise<Error>;
